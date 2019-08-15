const knex = require( 'knex' )
const app = require( './app' )
const { PORT, DB_URL, NODE_ENV } = require( './config' )

/**
 * The knexClient is imported by /services/... to manage DB interfacing
 */
const knexClient = knex( {
  client : 'pg',
  connection : DB_URL,
} )

app.listen( PORT, () => {

  if (NODE_ENV === 'development' ) {
    console.log( `Server listening at http://localhost:${PORT}` )
  }
  
} )

module.exports = {
  knexClient
}