import React, { useState } from 'react';

import OrderWidget from './OrderWidget'

export const generated = () => {
  let data = [{
    "id": 23,
    "scheduleId": 3,
    "userId": 3,
    "user": {
      "id": 3,
      "name": "ctirtoprodjo@gmail.com",
      "member": true,
      "__typename": "User"
    },
    "createdAt": "2022-01-05T20:28:48.343Z",
    "__typename": "SignUp"
  }, {
    "id": 24,
    "scheduleId": 3,
    "userId": 4,
    "user": {
      "id": 4,
      "name": "Ron S.",
      "member": true,
      "__typename": "User"
    },
    "createdAt": "2022-01-05T20:28:48.406Z",
    "__typename": "SignUp"
  }, {
    "id": 25,
    "scheduleId": 3,
    "userId": 1,
    "user": {
      "id": 1,
      "name": "Kevin Karyadi",
      "member": true,
      "__typename": "User"
    },
    "createdAt": "2022-01-05T20:28:48.473Z",
    "__typename": "SignUp"
  }
  ]
  // let setActiveSignups = (val) => {
  //   console.log('val', val)
  //   activeSignups = val
  // }
  const [activeSignups, setActiveSignups] = useState(data)

  // const[activeSignups, setActiveSignups] = useState(activeSignupsData)
  console.log('activeSignups',  activeSignups)
  // return <OrderWidget activeSignups={activeSignups}/>
  let rows = activeSignups.map((signup)=>{
    return (<tr key={signup.id}>
    <td>{signup.user.name}</td>
    <td><OrderWidget activeSignups={activeSignups} setActiveSignups={setActiveSignups} /></td>
    </tr>)
  })
  return (<>
  <table>
  <tbody>
  {rows}
  </tbody>
  </table></>)

}

export default { title: 'Components/OrderWidget' }
