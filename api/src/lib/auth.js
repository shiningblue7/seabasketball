import { AuthenticationClient } from 'auth0'

import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
})

/**
 * Represents the user attributes returned by the decoding the
 * Authentication provider's JWT together with an optional list of roles.
 */

/**
 * getCurrentUser returns the user information together with
 * an optional collection of roles used by requireAuth() to check
 * if the user is authenticated or has role-based access
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the return object only once you've decided they are safe to be seen
 * if someone were to open the Web Inspector in their browser.
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 *
 * @param decoded - The decoded access token containing user info and JWT
 *   claims like `sub`. Note, this could be null.
 * @param { token, SupportedAuthTypes type } - The access token itself as well
 *   as the auth provider type
 * @param { APIGatewayEvent event, Context context } - An optional object which
 *   contains information from the invoker such as headers and cookies, and the
 *   context information about the invocation such as IP Address
 * @returns RedwoodUser
 */
export const getCurrentUser = async (
  decoded,
  { token, type },
  { event, context }
) => {
  if (!decoded.sub || !decoded) {
    return null
  }

  let user = await db.user.findFirst({
    where: { subject: decoded.sub },
  })

  //find user by email
  if (!user && decoded.email) {
    user = await db.user.findFirst({
      where: { email: decoded.email },
    })
  }

  //if user is defined, but subject is empty, update the subject
  if (user && !user.subject) {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        subject: decoded.sub,
      },
    })
  }

  if (!user && token) {
    const auth0User = await auth0.getProfile(token)
    console.log('auth0User.email', auth0User.email)

    // otherwise create a new user
    user = await db.user.upsert({
      where: {
        email: auth0User.email,
      },
      update: {
        subject: auth0User.sub,
        email: auth0User.email,
        name: auth0User.name,
      },
      create: {
        subject: auth0User.sub,
        email: auth0User.email,
        name: auth0User.name,
      },
    })
  }
  const roles = user?.roles?.split(',')
  // const { roles } = parseJWT({ decoded })
  // console.log('roles' , roles)
  // const NAMESPACE = 'https://seattlebasketball.netlify.app'

  // const roles2 = parseJWT({ decoded: decoded, namespace: NAMESPACE }).roles
  // console.log('roles2' , roles2)

  // if (roles) {
  //   return { ...decoded, roles, type, token }
  // }
  let retUser = { ...decoded, roles, type, token, id: user.id }
  // console.log('retUser', retUser)
  return retUser

  // const roles = decoded[process.env.AUTH0_AUDIENCE + '/roles']

  // if (roles) {
  //   return { ...decoded, roles }
  // }

  // return { ...decoded }
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = () => {
  return !!context.currentUser
}

/**
 * When checking role membership, roles can be a single value, a list, or none.
 * You can use Prisma enums too (if you're using them for roles), just import your enum type from `@prisma/client`
 */

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param roles: {@link AllowedRoles} - Checks if the currentUser is assigned one of these roles
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and assigned one of the given roles,
 * or when no roles are provided to check against. Otherwise returns false.
 */
export const hasRole = (roles) => {
  if (!isAuthenticated()) {
    return false
  }

  const currentUserRoles = context.currentUser?.roles

  if (typeof roles === 'string') {
    if (typeof currentUserRoles === 'string') {
      // roles to check is a string, currentUser.roles is a string
      return currentUserRoles === roles
    } else if (Array.isArray(currentUserRoles)) {
      // roles to check is a string, currentUser.roles is an array
      return currentUserRoles?.some((allowedRole) => roles === allowedRole)
    }
  }

  if (Array.isArray(roles)) {
    if (Array.isArray(currentUserRoles)) {
      // roles to check is an array, currentUser.roles is an array
      return currentUserRoles?.some((allowedRole) =>
        roles.includes(allowedRole)
      )
    } else if (typeof currentUserRoles === 'string') {
      // roles to check is an array, currentUser.roles is a string
      return roles.some((allowedRole) => currentUserRoles === allowedRole)
    }
  }

  // roles not found
  return false
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param roles?: {@link AllowedRoles} - When checking role membership, these roles grant access.
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {@link AuthenticationError} - If the currentUser is not authenticated
 * @throws {@link ForbiddenError} - If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = ({ roles } = {}) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (roles && !hasRole(roles)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
