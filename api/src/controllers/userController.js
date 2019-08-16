const userService = require( '../services/userService' )

/**
 * PRIVATE USER CONTROLLERS
 */
exports.getFullUser = ( req, res, next ) => {
    
    const { userId } = req

    userService
        .getFullUser( userId )
        .then( ( res ) => {
            res.json( res )
        } )
        .catch( next )
}

exports.updateUser = ( req, res, next ) => {
    
    const { newUserFields } = req

    userService
        .updateUser( newUserFields )
        .then( ( res ) => {
            res.json( res )
        } )
        .catch( next )
}

exports.deleteUser = ( req, res, next ) => {
    
    const { userId } = req
    
    userService
        .deleteUser( userId )
        .then( ( res ) => {
            res.json( res )
        } )
        .catch( next )
}


