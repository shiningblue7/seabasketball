import React, { useState, useContext } from 'react';
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const OrderWidget = ({activeSignups, marker}) => {

  const UPDATE_SIGNUP_MUTATION = gql`
  mutation swapSignupPositions($id1: Int!, $id2: Int!) {
      swapSignupPositions(id1: $id1, id2: $id2) {
        userId
      }
  }
  `
  const [updateSignUp, { updateSignUploading, updateSignUperror }] = useMutation(
    UPDATE_SIGNUP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Sign Up updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: marker.QUERY }],
      awaitRefetchQueries: true,
    }
  )

  let moveUp = (signUpId) => {
    let localInput = {}
    let prevId = ''
    activeSignups.forEach(element => {
      if (element.id == marker.currentSignUpId ) {
        localInput = {
            variables:{
              id1 : parseInt(prevId),
              id2 : parseInt(marker.currentSignUpId)
            }
        }
        return
      }
      prevId = element.id
    });

    updateSignUp(localInput)

  }

  let moveDown = (signUpId) => {
    let localInput = {}
    let prevId = ''
    let updateIt = ''
    activeSignups.forEach(element => {
      if (updateIt) {
        localInput = {
          variables: {
              id1: parseInt(element.id),
              id2: parseInt(marker.currentSignUpId)
          }
        }
        updateIt = false
        return
      }
      prevId = element.id

      if (element.id == marker.currentSignUpId ) {
        updateIt = true
      }
    });

    updateSignUp(localInput)

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
