const subletService = require( '../services/subletService' )

/**
 * PRIVATE SUBLET CONTROLLERS
 */
exports.updateSublet = ( req, res, next ) => {
    const { updatedSublet } = req
    subletService
        .updateSublet( updatedSublet )
        .then( ( res ) => {
            res.json( res )
        } )
        .catch( next )
}

exports.deleteSublet  = ( req, res, next ) => {
    const { subletId } = req
    subletService
        .unlistSublet( subletId )
        .then( ( res ) => {
            res.json( res )
        } )
        .catch( next )
}
