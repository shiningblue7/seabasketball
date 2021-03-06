import { useMutation } from '@redwoodjs/web'
import { FieldError, Label, SelectField } from "@redwoodjs/forms"
import React, { useState } from 'react';
export const QUERY = gql`
  query SchedulesQuery {
    schedules {
      id
      title
      date
    }
    signUps{
      id
      createdAt
      user {
        id
        name
      }
    }
    users{
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

export const Success = ({ schedules, signUps, users }) => {
  // console.log('props ', props)
  // var tempUser = users.toString()
  // tempUser = tempUser.split(',')
  // console.log('users ', users)
  // console.log('signup ', signUps)
  // for (var i = 0; signUps.length > i;i++) {
  //   var signUpUser = signUps[i];
  //   console.log('signUpUser', signUpUser)
  //   console.log('signUpUser id', signUpUser.user.id)
  //   for (var j = 0; tempUser.length > j;j++) {
  //       var user = tempUser[j];
  //       console.log('user', user)
  //       console.log('user.id', user.id)
  //       if (user.id == signUpUser.user.id) {
  //         tempUser.splice(j, 1);
  //         j -= 1;
  //       }
  //   }
  // }
  // console.log('tempUser', tempUser)
  var userGoodList = [];
  for (var j = 0; signUps.length > j;j++) {
      var signUpUser = signUps[j];
      //console.log('user', signUpUser)
      //console.log('user.id', signUpUser.user.id)
      userGoodList = users.filter(x => {
        return x.id != signUpUser.user.id;
      })
      // console.log('userGood ', userGoodList)
  }
  // console.log('users ', users)
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
  const onDeleteClick = (id,name) => {
    if (confirm('Are you sure you want to remove ' + name + '?')) {
      deleteSignUp({ variables: { id } })
    }
  }

  function sayHello(name) {
    // alert(`hello, ${name}`);
    console.log('props', name.target.options)
  }
  const [players, setPlayers] = useState([])
  const printPlayers= (data) => {
    var newPlayers = []
    console.log(' data' , data)
    for (var key in data) {
      // console.log('key ' + key)
      // console.log('value ' + data[key])
      if (data[key].value) {
        console.log('data key value ' + data[key].value)
        newPlayers.push(data[key].value)
      }
    }
    setPlayers(newPlayers)
    return
  }

  const MAX_STRING_LENGTH = 150
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
    var locale = new Date(datetime).toLocaleString("en-US", {timeZone: "GMT"})
    return (

      <time dateTime={locale} title={locale}>
        {locale}
      </time>
    )
  }

  let count = 1
  return (
    <>
    <article>
    <h2>{schedules[0].title} - {new Date(schedules[0].date).toLocaleString()}</h2>
    </article>

    <div>
      <p>players: {players}</p>
      <h2> Signed Up Players</h2>
      <table border="1">
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
              <td><button
                    type="button"
                    title={'Remove signup' + signup.user.name}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(signup.id, signup.user.name)}
                  >
                    Remove
                  </button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2> Players</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Add</th>
            {/* <th>&nbsp;</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td><button
                    type="button"
                    title={'Add to signup' + user.name}
                    className="rw-button rw-button-small rw-button-green"
                    onClick={() => onAddClick(user.id)}
                  >
                    Add
                  </button></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </>
  )
  // return JSON.stringify(schedules)
}

// export const Success = ({ schedulePosts }) => {
//   return JSON.stringify(schedules)
// }
{/*<nav className="rw-table-actions">
                  <Link
                    to={routes.schedule({ id: schedule.id })}
                    title={'Show schedule ' + schedule.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSchedule({ id: schedule.id })}
                    title={'Edit schedule ' + schedule.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete schedule ' + schedule.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(schedule.id)}
                  >
                    Delete
                  </button>
                </nav>*/}
