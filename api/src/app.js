require( 'dotenv' ).config()
const express = require( 'express' )
const morgan = require( 'morgan')
const cors = require( 'cors' )
const helmet = require( 'helmet' )
const { NODE_ENV, DATABASE_URL } = require('./config')
const errorHandler = require( './middleware/errorHandler' )
const knex = require( 'knex' )
const knexPostGIS = require( 'knex-postgis' )
// const authenticate = require( './auth/authenticate' ) 

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

/**
 * ROUTERS
 */
// console.log(app)
app.use( '/api/public', require( './routers/publicRouter' ) )
// app.use( '/api/auth', require( './routers/authRouter' ) ) 
app.use( '/api', [
  require( './routers/subletRouter' ), 
  require( './routers/userRouter' )
] )

// When auth is done: 
// app.use( '/api', [
//   authenticate,
//   require( './routers/subletRouter' ), 
//   require( './routers/userRouter' )
// ] )

/**
 * DATABASE CONNECTION
 * Set up Postgres with PostGIS and bind to the app instance for use by the controllers and services
 */
const knexClient = knex( 
  {
    client : 'pg',
    dialect: 'postgres',
    connection : DATABASE_URL,
  } 
) 

/**
 * Add PostGIS functions to the Knex instance via the knex-postgis library.
 * Spatial Type (st) functions will be available at knexClient.postgis hereafter, 
 * which itself is retrieved via app.get( 'knexClient' ). 
 */

app.set( 'knexClient', knexPostGIS( knexClient ) )

/**
 * ERROR HANDLING
 */
app.use( errorHandler )


module.exports = app
