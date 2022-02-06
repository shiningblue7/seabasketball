import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db';
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
     db.post.create( {data: {title: 'test123', body: 'body123'}})
     console.log("Received event:", event)

     return {
         statusCode: 200,
     };
 };

 module.exports.handler = schedule("* * * * *", handler);
