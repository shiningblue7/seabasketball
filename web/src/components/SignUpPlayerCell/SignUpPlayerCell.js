import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/toast'
import { Toaster } from '@redwoodjs/web/toast'
import { ButtonField, FieldError, Label, SelectField } from "@redwoodjs/forms"
import React, { useState } from 'react';

export const QUERY = gql`
  query FindScheduleQuery {
    schedule: activeSchedule {
      id
      title
      date
      createdAt
      limit
    }
    activeSignups {
      id
      scheduleId
      userId
      user {
        id
        name
        member
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

export const Success = ({ schedule, activeSignups, users, steps, setSteps }) => {
  // const [steps, setSteps] = useState(0);
  // const increment = () => {
  //   // console.log('here' , state)
  //   setSteps(prevState => prevState + 1)
  // }
  // function increment() {
  //   // console.log('here' , state)
  //   setSteps(prevState => prevState + 1)
  // }
  const scheduleLimit = schedule.limit
  const signUps = activeSignups
  // console.log('signUps', signUps)
  const signUpList = []
  const queueList = []
  const { logIn,hasRole, isAuthenticated, userMetadata, currentUser } = useAuth()
  var userGoodList = users
  var userGuest = ''
  var guestPresent = {}
  var countPresent = {}
  if (hasRole('admin')) {
    for (var j = 0; signUps.length > j; j++) {
      var signUpUser = signUps[j]
      guestPresent[signUpUser.user.id] = guestPresent[signUpUser.user.id] ? guestPresent[signUpUser.user.id]++ : 1
      countPresent[signUpUser.user.id] = countPresent[signUpUser.user.id] ? 0 : 0
      userGoodList = userGoodList.filter((user) => {
        return user.id != signUpUser.user.id
      })
      if (scheduleLimit > j) {
        signUpList.push(signUpUser)
      } else {
        queueList.push(signUpUser)
      }
    }
  } else if (currentUser) {
    for (var j = 0; signUps.length > j; j++) {
      var signUpUser = signUps[j]
      guestPresent[signUpUser.user.id] = guestPresent[signUpUser.user.id] ? guestPresent[signUpUser.user.id]++ : 1
      countPresent[signUpUser.user.id] = countPresent[signUpUser.user.id] ? 0 : 0
    }
    userGoodList = userGoodList.filter((user) => {
      return user.id === currentUser.id
    })
    for (var j = 0; signUps.length > j; j++) {
      var signUpUser = signUps[j]
      if (signUpUser.user.id === currentUser.id) {
        userGoodList = []
        // userGuest = " Guest"
      }
      if (scheduleLimit > j) {
        signUpList.push(signUpUser)
      } else {
        queueList.push(signUpUser)
      }
    }
  }
  // console.log('signUpList', signUpList)

  const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      member
    }
  }
  `
  const [updateMember, { updateMemberloading, updateMembererror }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Member updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

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
        toast.success('Signed up')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const updateMemberClick = (userId, memberBoolean) => {
    // if (confirm('Are you sure you want to remove ' + name + '?')) {
      // deleteSignUp({ variables: { id } })
    // }
    // console.log('add user' , userId)
    // console.log('memberBoolean ' , memberBoolean)
    var input= {}
    const castInput = Object.assign(input, {
      member: memberBoolean,
      // userId: parseInt(userId),
    })
    updateMember({ variables: {
                              id: parseInt(userId),
                              input: castInput }
                   }
                )
  }

  const onAddClick = (userId, scheduleId) => {
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
      toast.success('Sign Up Deleted')
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


  let logInPage =  (
    <>
      Please login to see schedule
      <br />
      <button onClick={logIn}>
      Log In
      </button>
    </>
  )

  if (isAuthenticated) {
    // const [steps, setSteps] = useState(0);

    let count = 1
    let signedUpPlayers = (<>
      <article>
        <h2>
          {schedule.title} (Limit - <font color="red">{schedule.limit}</font>) - {new Date(schedule.date).toLocaleString()}
        </h2>
      </article>

      <div>
        <h2>Signed Up Players</h2>
        <table>
          <thead>
            <tr>
              <th>Signed Up</th>
              <th>Order</th>
              <th>Remove</th>
              {/* {hasRole('admin') && ( <><th>Member</th></>)} */}
              <th>Member</th>
            </tr>
          </thead>
          <tbody>
            {signUpList.map((signup, count) => (
              <tr key={signup.id}>
                <td>{truncate(signup.user.name)}
                    { countPresent[parseInt(signup.user.id)] >= 1 && ( <> +{ countPresent[parseInt(signup.user.id)] } Guest </>   )}
                    <p hidden> { countPresent[parseInt(signup.user.id)]++ }</p>
                    {(( currentUser.id === signup.user.id || hasRole('admin') ) && guestPresent[parseInt(signup.user.id)] < 2 && ++guestPresent[signup.user.id] )

                    && (
                      <button className="rw-button rw-button-small rw-button-blue"
                      onClick={() => onAddClick(signup.user.id, schedule.id)}
                      >
                      Add Guest
                      </button>)
                    }
                </td>
                {/* <td>{steps}{setSteps(steps + 1)}</td> */}
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
                {!hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && signup.user.member && (
                   <><td>
                   Member
                   </td></>
                   )}
                   {!hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && !signup.user.member && (
                   <><td>
                   Non Member
                   </td></>
                   )}
                {hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && !signup.user.member && (
                   <><td>
                   <button
                      type="button"
                      title={'Add member' + signup.user.name}
                      className="rw-button rw-button-small rw-button-black"
                      onClick={() => updateMemberClick(signup.user.id, true)}
                    >
                      Set as member
                    </button>
                   </td></>
                   )}
                {/* {hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && !signup.user.member && ( <><td>Add as Member</td></>)} */}
                {hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && signup.user.member && (
                  <><td>
                   <button
                      type="button"
                      title={'Remove member' + signup.user.name}
                      className="rw-button rw-button-small rw-button-orange"
                      onClick={() => updateMemberClick(signup.user.id, false)}
                    >
                      Unset member
                    </button>
                   </td></>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </>
)

let queuePlayers = (<>
  <div>
    <h2>Queued Up Players</h2>
    <table className='rx-table'>
      <thead>
        <tr>
          <th>Signed Up</th>
          <th>Order</th>
          <th>Remove</th>
          {/* {hasRole('admin') && ( <><th>Member</th></>)} */}
          <th>Member</th>
        </tr>
      </thead>
      <tbody>
        {queueList.map((signup, count) => (
          <tr key={signup.id}>
            <td>{truncate(signup.user.name)}
                { countPresent[parseInt(signup.user.id)] >= 1 && ( <> +{ countPresent[parseInt(signup.user.id)] } Guest </>   )}
                <p hidden> { countPresent[parseInt(signup.user.id)]++ }</p>
                {(( currentUser.id === signup.user.id || hasRole('admin') ) && guestPresent[parseInt(signup.user.id)] < 2 && ++guestPresent[signup.user.id] )

                && (
                  <button className="rw-button rw-button-small rw-button-blue"
                  onClick={() => onAddClick(signup.user.id, schedule.id)}
                  >
                  Add Guest
                  </button>)
                }
            </td>
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
            {!hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && signup.user.member && (
               <><td>
               Member
               </td></>
               )}
               {!hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && !signup.user.member && (
               <><td>
               Non Member
               </td></>
               )}
            {hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && !signup.user.member && (
               <><td>
               <button
                  type="button"
                  title={'Set member' + signup.user.name}
                  className="rw-button rw-button-small rw-button-black"
                  onClick={() => updateMemberClick(signup.user.id, true)}
                >
                  Set as member
                </button>
               </td></>
               )}
            {/* {hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && !signup.user.member && ( <><td>Add as Member</td></>)} */}
            {hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && signup.user.member && (
              <><td>
               <button
                  type="button"
                  title={'Remove member' + signup.user.name}
                  className="rw-button rw-button-small rw-button-orange"
                  onClick={() => updateMemberClick(signup.user.id, false)}
                >
                  Unset member
                </button>
               </td></>
              )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </>
)

let availablePlayers = userGoodList.length > 0 && (
  <><div>
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

    let page = (<>
                <Toaster
                  position="top-center"
                  toastOptions={{success: { duration: 3000 } }}
                />
                {signedUpPlayers}
                {queueList.length > 0 && queuePlayers}
                {availablePlayers}

                </>)
    return page
  } else {
      return logInPage
  }
}
