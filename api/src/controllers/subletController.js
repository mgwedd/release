const subletService = require( '../services/subletService' )

/**
 * PRIVATE SUBLET CONTROLLERS
 */
exports.updateSublet = ( req, res, next ) => {
    const { updatedSublet } = req
    const knexClient = req.app.get( 'knexClient' )
    subletService
        .updateSublet( updatedSublet, knexClient )
        .then( ( queryResult ) => {
            res.json( queryResult )
        } )
        .catch( next )
}

exports.deleteSublet  = ( req, res, next ) => {
    const { subletId } = req
    const knexClient = req.app.get( 'knexClient' )
    subletService
        .unlistSublet( subletId, knexClient )
        .then( ( queryResult ) => {
            res.json( queryResult )
        } )
        .catch( next )
}
