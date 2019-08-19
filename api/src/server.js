const app = require( './app' )
const { PORT, NODE_ENV } = require( './config' )

app.listen( PORT, () => {

  if (NODE_ENV === 'development' ) {
    console.log( `Server listening at http://localhost:${PORT}` )
  }
  
} )
