import React, { useState, useContext } from 'react';
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const OrderWidget = ({activeSignups, marker, setActiveSignups, currentSignUpId, schedule, QUERY}) => {

  const UPDATE_SIGNUP_MUTATION = gql`
  mutation UpdateSignUpMutation($id: Int!, $input: UpdateSignUpInput!) {
    updateSignUp(id: $id, input: $input) {
      userId
    }
  }
  `
  const [updateSignUp, { updateSignUploading, updateSignUperror }] = useMutation(
    UPDATE_SIGNUP_MUTATION,
    {
      onCompleted: () => {
        toast.success('SignUp updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: marker.QUERY }],
      awaitRefetchQueries: true,
    }
  )

  let moveUp = (signUpId) => {
    // console.log('activeSignups', activeSignups)
    // console.log('marker', marker)

    const input = []
    let prevUserId = ''
    let prevId = ''
    activeSignups.forEach(element => {

      if (element.id == marker.currentSignUpId ) {
        const prevObj = Object.assign({}, {
          userId: parseInt(element.userId)
        })
        input.push( {
          variables: {
              id: parseInt(prevId),
              input: prevObj
          }
        })

        const nextObj = Object.assign({}, {
          userId: parseInt(prevUserId)
        })
        input.push( {
          variables: {
              id: parseInt(marker.currentSignUpId),
              input: nextObj
          }
        })
        return
      }
      prevId = element.id
      prevUserId = element.userId
    });

    // console.log('input' , input)

    input.forEach(localInput => {
      updateSignUp(localInput)
      }
    )
  }

  let moveDown = (signUpId) => {
    const input = []
    let prevUserId = ''
    let prevId = ''
    let updateIt = ''
    activeSignups.forEach(element => {
      if (updateIt) {
        const prevObj = Object.assign({}, {
          userId: parseInt(prevUserId)
        })
        input.push( {
          variables: {
              id: parseInt(element.id),
              input: prevObj
          }
        })

        const nextObj = Object.assign({}, {
          userId: parseInt(element.userId)
        })
        input.push( {
          variables: {
              id: parseInt(prevId),
              input: nextObj
          }
        })
        updateIt = false
      }

      prevId = element.id
      prevUserId = element.userId

      if (element.id == marker.currentSignUpId ) {
        updateIt = true
      }
    });

    // console.log('input' , input)

    input.forEach(localInput => {
      // console.log('localInput', localInput)
      updateSignUp(localInput)
      }
    )
  }

  let orderButton = (
  <>
  {marker.count > 1 && (
    <>
    <button
      border="1"
      className="rw-button rw-button-small rw-button-green"
      onClick={moveUp}
    >
    Up
    </button>
    &nbsp;&nbsp;&nbsp;</>
  )}

    {marker.count < activeSignups.length && (
    <button
      border="1"
      onClick={moveDown}
      className="rw-button rw-button-small rw-button-purple"
    >
    Down
    </button>
    )}
    </>

  )
    return orderButton
}

export default OrderWidget
