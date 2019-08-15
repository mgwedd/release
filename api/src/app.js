require( 'dotenv' ).config()
const express = require( 'express' )
const morgan = require( 'morgan')
const cors = require( 'cors' )
const helmet = require( 'helmet' )
const { NODE_ENV } = require('./config')
const errorHandler = require( './middleware/errorHandler' )
const logger = require( './middleware/logger')
const authenticate = require( './auth/authenticate' )

const app = express()

/**
 * UNIVERSAL MIDDLEWARE
 */
app.use( cors() )
app.use( helmet() )
app.use( morgan( ( NODE_ENV === 'production' ) 
  ? 'tiny' 
  : 'dev', 
{ skip : () => NODE_ENV === 'test' }
) ) 
app.use( logger )

/**
 * ROUTERS
 */
app.use( '/api/public', require( './routers/publicRouter' ) )
app.use( '/api/auth', require( './routers/authRouter' ) ) 
app.use( '/api', [
  authenticate,
  require( './routers/subletRouter' ), 
  require( './routers/userRouter' )
] )

/**
 * ERROR HANDLING
 */
app.use( errorHandler )

// TODO remove, for dev environment logging
const config = require('./config')
console.log('Server environment: ', config)

module.exports = app