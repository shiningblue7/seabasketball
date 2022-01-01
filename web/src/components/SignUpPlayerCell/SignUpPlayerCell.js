import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/toast'
import { FieldError, Label, SelectField } from "@redwoodjs/forms"
import React, { useState } from 'react';

export const QUERY = gql`
  query FindScheduleQuery {
    schedule: activeSchedule {
      id
      title
      date
      createdAt
    }
    activeSignups {
      id
      scheduleId
      userId
      user {
        id
        name
      }
      createdAt
    }
    users {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ schedule, activeSignups, users }) => {
  const signUps = activeSignups
  // return <></>
  const { logIn,hasRole, isAuthenticated, userMetadata, currentUser } = useAuth()
  var userGoodList = users;
  var userGuest = '';
  if (hasRole('admin')) {
    for (var j = 0; signUps.length > j; j++) {
      var signUpUser = signUps[j]
      userGoodList = userGoodList.filter((user) => {
        return user.id != signUpUser.user.id
      })
    }
  } else if (currentUser) {
    userGoodList = userGoodList.filter((user) => {
      return user.id === currentUser.id
    })
    for (var j = 0; signUps.length > j; j++) {
      var signUpUser = signUps[j]
      if (signUpUser.user.id === currentUser.id) {
        userGuest = " Guest"
      }
    }
  }


  const CREATE_SIGN_UP_MUTATION = gql`
    mutation CreateSignUpMutation($input: CreateSignUpInput!) {
      createSignUp(input: $input) {
        id
      }
    }
  `
  const [createSignUp, { loading, error }] = useMutation(
    CREATE_SIGN_UP_MUTATION,
    {
      onCompleted: () => {
        // toast.success('SignUp created')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onAddClick = (userId, scheduleId) => {
    // if (confirm('Are you sure you want to remove ' + name + '?')) {
      // deleteSignUp({ variables: { id } })
    // }
    // console.log('add user' , userId)
    // console.log('add schedule' , scheduleId)
    var input= {}
    const castInput = Object.assign(input, {
      scheduleId: parseInt(scheduleId),
      userId: parseInt(userId),
    })
    createSignUp({ variables: { input: castInput } })
  }


  const DELETE_SIGNUP_MUTATION = gql`
    mutation deleteSignUpMutation($id: Int!) {
      deleteSignUp(id: $id) {
        id
      }
    }
  `
  const [deleteSignUp] = useMutation(DELETE_SIGNUP_MUTATION, {
    onCompleted: () => {
      toast.success('Sign Up deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const onDeleteClick = (id, name) => {
    if (hasRole('admin')) {
      deleteSignUp({ variables: { id } })
    } else if (confirm('Are you sure you want to remove ' + name + '?')) {
      deleteSignUp({ variables: { id } })
    }
  }

  const MAX_STRING_LENGTH = 20
  const truncate = (text) => {
    let output = text
    if (text && text.length > MAX_STRING_LENGTH) {
      output = output.substring(0, MAX_STRING_LENGTH) + '...'
    }
    return output
  }

  const jsonTruncate = (obj) => {
    return truncate(JSON.stringify(obj, null, 2))
  }

  const timeTag = (datetime) => {
    var locale = new Date(datetime).toLocaleString('en-US', { timeZone: 'GMT' })
    return (
      <time dateTime={locale} title={locale}>
        {locale}
      </time>
    )
  }

  let count = 1
  if (isAuthenticated) {
    return (
      <>
        <article>
          <h2>
            {schedule.title} - {new Date(schedule.date).toLocaleString()}
          </h2>
        </article>

        <div>
          <h2> Signed Up Players</h2>
          <table>
            <thead>
              <tr>
                <th>Signed Up</th>
                <th>Order</th>
                <th>Remove</th>
                {/* <th>&nbsp;</th> */}
              </tr>
            </thead>
            <tbody>
              {signUps.map((signup, count) => (
                <tr key={signup.id}>
                  <td>{truncate(signup.user.name)}</td>
                  <td>{++count}</td>
                  <td>
                    { ((currentUser.id === signup.user.id) || hasRole('admin') ) && (
                    <button
                      type="button"
                      title={'Remove signup' + signup.user.name}
                      className="rw-button rw-button-small rw-button-red"
                      onClick={() => onDeleteClick(signup.id, signup.user.name)}
                    >
                      Remove
                    </button>
                    ) }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Available Players</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Add</th>
                {/* <th>&nbsp;</th> */}
              </tr>
            </thead>
            <tbody>
              {userGoodList.map((user) => (
                <tr key={user.id}>
                  <td>{user.name} {userGuest}</td>
                  <td>
                    <button
                      type="button"
                      title={'Add to signup' + user.name}
                      className="rw-button rw-button-small rw-button-green"
                      onClick={() => onAddClick(user.id, schedule.id)}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
              } else {
                return (
                  <>
                    Please login to see schedule
                    <br />
                    <button onClick={logIn}>
                    Log In
                    </button>
                  </>
                )
              }
}
