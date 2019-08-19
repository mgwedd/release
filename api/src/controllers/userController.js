const userService = require( '../services/userService' )

/**
 * PRIVATE USER CONTROLLERS
 */
exports.getFullUser = ( req, res, next ) => {
    
    const { userId } = req
    const knexClient = req.app.get( 'knexClient' )

    userService
        .getFullUser( userId, knexClient )
        .then( ( queryResult ) => {
            res.json( queryResult )
        } )
        .catch( next )
}

exports.updateUser = ( req, res, next ) => {
    
    const { newUserFields } = req
    const knexClient = req.app.get( 'knexClient' )

    userService
        .updateUser( newUserFields, knexClient )
        .then( ( queryResult ) => {
            res.json( queryResult )
        } )
        .catch( next )
}

exports.deleteUser = ( req, res, next ) => {
    
    const { userId } = req
    const knexClient = req.app.get( 'knexClient' )
    
    userService
        .deleteUser( userId, knexClient )
        .then( ( queryResult ) => {
            res.json( queryResult )
        } )
        .catch( next )
}


