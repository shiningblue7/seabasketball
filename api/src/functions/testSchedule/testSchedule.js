import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db';
// import {getNextWeek, formatTime} from 'src/components/AutoCreate/AutoCreateForm'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
 const { schedule } = require('@netlify/functions')

 const handler = async function(event, context) {
    //  await db.post.create( {data: {title: 'test123', body: 'body123'}})
    //  printData = await createDb()
    await createDb()
     console.log("Received event: 123", event)
    //  console.log("PrintData", printData)

     return {
         statusCode: 200,
     };
 };

 const createDb = async function() {
    console.log('bla')
    await db.post.create( {data: {title: 'test123', body: 'body123'}})
 }
//  const createDb = async function() {
//     let id = 1
//     let autoCreate =db.autoCreate.findUnique({ where: { id } })
//     let createNext = getNextWeek(new Date(), new Date(autoCreate?.scheduledAt).getDay(), formatTime(autoCreate?.scheduledAt))
//     return createNext
//  }
//  const handler =  function(event, context) {
//   // await db.post.create( {data: {title: 'test123', body: 'body123'}})
//   console.log("context", context)
//   console.log("Received event: 123", event)

//   return {
//       statusCode: 204,
//   };
// };

 module.exports.handler = schedule("@hourly", handler);
// export const handler = schedule("@hourly", handler);
