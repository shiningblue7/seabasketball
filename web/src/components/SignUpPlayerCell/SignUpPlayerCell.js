import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/toast'
import { Toaster } from '@redwoodjs/web/toast'
import { ButtonField, FieldError, Label, SelectField } from "@redwoodjs/forms"
import React, { useRef, useState } from 'react';
import OrderWidget from '../OrderWidget/OrderWidget'
import SchedulePage from 'src/pages/Schedule/SchedulePage/SchedulePage'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  Flex,
  Spacer,
  Box
} from '@chakra-ui/react'
import { HiOutlineStar, HiUserRemove, HiUserAdd } from "react-icons/hi";
import { FiUserPlus, FiUserX } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";

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
      member
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Please bug Ronald to make a schedule</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ schedule, activeSignups, users}) => {
  const [disable, setDisable] = React.useState(false);
  // const[activeSignups, setActiveSignups] = useState(activeSignupsData)
  // console.log('activeSignups',  activeSignups)
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
  userGoodList.sort(function(a, b) {
    return a.id - b.id;
  });
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

  const updateMemberClick = async (userId, memberBoolean) => {
    // if (confirm('Are you sure you want to remove ' + name + '?')) {
      // deleteSignUp({ variables: { id } })
    // }
    // console.log('add user' , userId)
    // console.log('memberBoolean ' , memberBoolean)
    setDisable(true);
    var input= {}
    const castInput = Object.assign(input, {
      member: memberBoolean,
      // userId: parseInt(userId),
    })
    await updateMember({ variables: {
                              id: parseInt(userId),
                              input: castInput }
                   }
                )
    setDisable(false)
  }

  const onAddClick = async (userId, scheduleId) => {
    setDisable(true);
    var input= {}
    const castInput = Object.assign(input, {
      scheduleId: parseInt(scheduleId),
      userId: parseInt(userId),
    })
    await createSignUp({ variables: { input: castInput } })
    setDisable(false);
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
  const onDeleteClick = async (id, name) => {
    setDisable(true);
    if (confirm('Are you sure you want to remove ' + name + '?')) {
      await deleteSignUp({ variables: { id } })
    }
    setDisable(false);
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


    // const [steps, setSteps] = useState(0);

    let count = 1
    let buttonSize = "lg"
    let signedUpPlayers = (<>
      <article>
        <h2>
          {schedule.title}  - {new Date(schedule.date).toLocaleString()}
        </h2>

        <h4>
                Limit : <font color="red">{schedule.limit}</font>
        </h4>
      </article>

      <div>
        <h4>Signed Up Players : <font color="green">{signUps.length}</font></h4>
        { queueList.length > 0 && ( <h4>Queued Up Players : <font color="green">{queueList.length}</font></h4> )}
        <Table
                width={{md: '40%'}}>
        <Thead>
            <Tr>
              <Th>Signed Up</Th>
              <Th>Menu</Th>
              {/* <Th>Order</Th> */}
              {/* <Th>Remove</Th> */}
              {/* {hasRole('admin') && ( <><Th>Member</Th></>)} */}
              {/* <Th>Member</Th> */}
            </Tr>
        </Thead>
          <Tbody>
            {signUpList.map((signup, count) => (
              <Tr key={signup.id}>
                <Td>
                    <Flex>
                    {count++}) {truncate(signup.user.name)}
                    { countPresent[parseInt(signup.user.id)] >= 1 && ( <> +{ countPresent[parseInt(signup.user.id)] } Guest </>   )}
                    <p hidden> { countPresent[parseInt(signup.user.id)]++ }</p>
                    <Spacer/>



                    </Flex>
                </Td>
                <Td>
                    <Flex gap={1}>
                    <Spacer/>


                    {(( currentUser.id === signup.user.id || hasRole('admin') ) && guestPresent[parseInt(signup.user.id)] < 2 && ++guestPresent[signup.user.id] )

                    && (
                      <IconButton size={buttonSize} aria-label='Add Guest' colorScheme={'blue'} icon={<FiUserPlus/> } onClick={() => onAddClick(signup.user.id, schedule.id)}
                      disabled={disable}/>
                      )
                    }


                    { ((currentUser.id === signup.user.id) || hasRole('admin') ) && (
                      <Flex gap={1} flexDirection={"column"}>
                      <IconButton size={buttonSize} aria-label='Remove Guest' colorScheme={'red'} icon={<FiUserX/> } onClick={() => onDeleteClick(signup.id, signup.user.name)}
                    disabled={disable}/>
                    {hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && !signup.user.member && (

                    <IconButton size={buttonSize} aria-label='Unset Member' colorScheme={'gray'} icon={<HiOutlineStar/> } onClick={() => updateMemberClick(signup.user.id, true)}
                    disabled={disable}/>

                    )
                    }

                    {hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && signup.user.member && (
                    <>
                    <IconButton size={buttonSize} aria-label='Unset Member' colorScheme={'orange'} icon={<HiOutlineStar/> } onClick={() => updateMemberClick(signup.user.id, false)}
                    disabled={disable}/>
                    </>
                    )
                    }
                      </Flex>
                  ) }

                    {hasRole('admin') && (
                    <OrderWidget size={buttonSize} schedule={schedule} marker={{QUERY, count, currentSignUpId: signup.id}} activeSignups={activeSignups} disable={disable} setDisable={setDisable} queueList={queueList}/>
                  ) }





                    {/* </Flex> */}
                    </Flex>
                </Td>
                {/* <Td>{steps}{setSteps(steps + 1)}</Td> */}
                {/* <Td>{++count}
                  {hasRole('admin') && (
                    <OrderWidget schedule={schedule} marker={{QUERY, count, currentSignUpId: signup.id}} activeSignups={activeSignups} disable={disable} setDisable={setDisable} queueList={queueList}/>
                  ) }
                </Td> */}


              </Tr>
            ))}
          </Tbody>
        </Table>

      </div>

      </>
)

let queuePlayers = (<>
  <div>
    <h2>Queued Up Players : <font color="blue">{queueList.length}</font></h2>
    <Table width={{md: '40%'}}>
      <Thead>
        <Tr>
          <Th>Signed Up</Th>
          <Th>Order</Th>
          <Th>Remove</Th>
          {/* {hasRole('admin') && ( <><Th>Member</Th></>)} */}
          <Th>Member</Th>
        </Tr>
      </Thead>
      <Tbody>
        {queueList.map((signup, count) => (
          <Tr key={signup.id}>
            <Td>{truncate(signup.user.name)}
                { countPresent[parseInt(signup.user.id)] >= 1 && ( <> +{ countPresent[parseInt(signup.user.id)] } Guest </>   )}
                <p hidden> { countPresent[parseInt(signup.user.id)]++ }</p>
                {(( currentUser.id === signup.user.id || hasRole('admin') ) && guestPresent[parseInt(signup.user.id)] < 2 && ++guestPresent[signup.user.id] )

                && (
                  <button className="rw-button rw-button-small rw-button-blue"
                  onClick={() => onAddClick(signup.user.id, schedule.id)}
                  disabled={disable}
                  >
                  Add Guest
                  </button>)
                }
            </Td>
            {/* <Td>{++count}</Td> */}
            <Td>{++count}
                  {hasRole('admin') && (
                    <OrderWidget schedule={schedule} marker={{QUERY, count, currentSignUpId: signup.id, queue: true}} activeSignups={activeSignups} queueList={queueList} disable={disable} setDisable={setDisable} />
                  ) }
            </Td>
            <Td>
              { ((currentUser.id === signup.user.id) || hasRole('admin') ) && (
              <button
                type="button"
                title={'Remove signup' + signup.user.name}
                className="rw-button rw-button-small rw-button-red"
                onClick={() => onDeleteClick(signup.id, signup.user.name)}
                disabled={disable}
              >
                Remove
              </button>
              ) }
            </Td>
            <Td>
            {!hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && signup.user.member && (
              <>
              Member
              </>
              )}
              {!hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && !signup.user.member && (
              <>
              Non Member
              </>
              )}
            {hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && !signup.user.member && (
              <button
                  type="button"
                  title={'Set member' + signup.user.name}
                  className="rw-button rw-button-small rw-button-black"
                  onClick={() => updateMemberClick(signup.user.id, true)}
                  disabled={disable}
                >
                  Set as member
                </button>
              )}
            {/* {hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && !signup.user.member && ( <><Td>Add as Member</Td></>)} */}
            {hasRole('admin') && countPresent[parseInt(signup.user.id)] == 1 && signup.user.member && (
              <button
                  type="button"
                  title={'Remove member' + signup.user.name}
                  className="rw-button rw-button-small rw-button-orange"
                  onClick={() => updateMemberClick(signup.user.id, false)}
                  disabled={disable}
                >
                  Unset member
                </button>
              )}
              </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </div>
  </>
)

let availablePlayers = userGoodList.length > 0 && (
  <><div>
    <h2>Available Players</h2>
        <Table width={{md: '40%'}}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Add</Th>
              <Th>Member</Th>
              {/* <Th>&nbsp;</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {userGoodList.map((user) => (
              <Tr key={user.id}>
                <Td>{user.name} {userGuest}</Td>
                <Td>
                  <button
                    type="button"
                    title={'Add to signup' + user.name}
                    className="rw-button rw-button-small rw-button-green"
                    onClick={() => onAddClick(user.id, schedule.id)}
                    disabled={disable}
                  >
                    Add
                  </button>
                </Td>
                <Td>
                  {!hasRole('admin') && user.member && (
                  <>
                  Member
                  </>
                  )}
                  {!hasRole('admin') && !user.member && (
                  <>
                  Non Member
                  </>
                  )}
                {hasRole('admin') && !user.member && (
                  <button
                      type="button"
                      title={'Add member' + user.name}
                      className="rw-button rw-button-small rw-button-black"
                      onClick={() => updateMemberClick(user.id, true)}
                      disabled={disable}
                    >
                      Set as member
                    </button>
                  )}
                {hasRole('admin') && user.member && (
                  <button
                      type="button"
                      title={'Remove member' + user.name}
                      className="rw-button rw-button-small rw-button-orange"
                      onClick={() => updateMemberClick(user.id, false)}
                      disabled={disable}
                    >
                      Unset member
                    </button>
                  )}
                  </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
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

}
