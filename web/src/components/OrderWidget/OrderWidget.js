import React, { useState, useContext } from 'react';
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
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

const OrderWidget = ({size, activeSignups, marker, queueList, disable, setDisable}) => {

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

  let moveUp = async (signUpId) => {
    setDisable(true)
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

    await updateSignUp(localInput)
    setDisable(false)
  }

  let moveDown = async (signUpId) => {
    setDisable(true)
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

    await updateSignUp(localInput)
    setDisable(false)
  }

  let orderButton = (
  <>
  <Flex gap={1} flexDirection={"column"}>
  {( marker.queue || marker.count == 1 ) && (


<IconButton size={size} aria-label='Up' colorScheme={'green'} icon={<FiArrowUpCircle/> } onClick={moveUp}
                disabled='true'/>

  )}
  {( marker.queue || marker.count > 1 ) && (


    <IconButton size={size} aria-label='Up' colorScheme={'green'} icon={<FiArrowUpCircle/> } onClick={moveUp}
                    disabled={disable}/>

  )}


    {( (marker.queue && marker.count < queueList.length ) || (!marker.queue && marker.count < activeSignups.length) ) && (

    <IconButton size={size} aria-label='Down' colorScheme={'messenger'} icon={<FiArrowDownCircle/> } onClick={moveDown}
                    disabled={disable}/>


    )}

    {( (marker.queue && marker.count < queueList.length ) || (!marker.queue && marker.count == activeSignups.length) ) && (

<IconButton size={size} aria-label='Down' colorScheme={'messenger'} icon={<FiArrowDownCircle/> } onClick={moveDown}
                disabled='true'/>


    )}
    </Flex>
    </>

  )
    return orderButton
}

export default OrderWidget
