'use strict'
const knex = require('knex')
const { knexDbConection } = require('./config_database')
const { Lambda } = require('aws-sdk')

module.exports.runQuery = async (event) => {
  const convertSpreadsheetLambda = new Lambda({
    region: 'us-east-1'
  })
  const db = knex(knexDbConection)

  const { rows } = await db.raw('select * from users;')

  const convertLambdaParams = {
    FunctionName: 'convert-spreadsheet',
    InvocationType: 'Event',
    Payload: JSON.stringify({ rows })
  }

  // convertSpreadsheetLambda.invoke(convertLambdaParams, (error, data) => {
  //   if (error) console.log('ERROR', error)
  //   else console.log(data)
  // })
  const response = await convertSpreadsheetLambda
    .invoke(convertLambdaParams)
    .promise()

  console.log('RESPONSE INVOKE', response)

  return {
    statusCode: 200
    // body: JSON.stringify({ rows }, null, 2)
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
