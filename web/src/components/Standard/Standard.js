import { Link, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth'
import { Fragment } from 'react'

const Standard = ({ children }) => {
  const { logIn, logOut, hasRole, isAuthenticated, userMetadata } = useAuth()
  return (
    <>

      <header>


        <nav>
          <ul>
            <li>
            <Link to={routes.home()}>Home</Link>
            </li>
            { hasRole(['admin']) && (
              <Fragment>
            <li>
              <Link to={routes.users()}>Users</Link>
            </li>
            <li>
              <Link to={routes.schedules()}>Schedules</Link>
            </li>
            </Fragment>
            )}
            <li className='float-right'>
              {/* <font color="white">{isAuthenticated && userMetadata.name}</font> */}
               {/* {isAuthenticated && userMetadata.name}
               &nbsp; - &nbsp;
               {isAuthenticated && userMetadata.email}
               &nbsp;&nbsp;&nbsp; */}
              {/* <button onClick={isAuthenticated ? logOut : logIn}>
                {isAuthenticated ? 'Log Out' : 'Log In'}
              </button> */}
              <button
              onClick={async () => {
                if (isAuthenticated) {
                  await logOut({ returnTo: process.env.AUTH0_REDIRECT_URI })
                } else {
                  const searchParams = new URLSearchParams(window.location.search)
                  await logIn({
                    appState: { targetUrl: searchParams.get('redirectTo') },
                  })
                }
              }}
            >
              {isAuthenticated ? 'Log out' : 'Log in'}
            </button>

            </li>


            {/* {isAuthenticated && <li>{userMetadata.name} [{userMetadata.email}]</li>} */}
          </ul>
        </nav>
        <h1>
          <Link to={routes.home()}>Basketball Signup</Link>
        </h1>
      </header>
      <main>{children}</main>

    </>
  )
}

export default Standard
