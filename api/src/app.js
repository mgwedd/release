require( 'dotenv' ).config()
const express = require( 'express' )
const morgan = require( 'morgan')
const cors = require( 'cors' )
const helmet = require( 'helmet' )
const { NODE_ENV } = require('./config')
const errorHandler = require( './middleware/errorHandler' )
const logger = require( './middleware/logger')
const authController = require( './controllers/authController')
const subletController = require( './controllers/subletController')

const app = express()

app.use( cors() )
app.use( helmet() )
app.use( morgan( ( NODE_ENV === 'production' ) 
  ? 'tiny' 
  : 'dev', 
{ skip : () => NODE_ENV === 'test' }
) ) 
app.use( logger )
app.use( errorHandler )

// Resource Controllers
app.use( '/api', authController )
app.use( '/api', subletController )

module.exports = app