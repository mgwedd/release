const express = require( 'express' )
const router = express.Router()

const publicController = require( '../controllers/publicController' )

/**
 * PUBLIC ENDPOINTS ROUTER
 */

router
    .route( '/sublet' )

    .get( publicController.getSublets )

    .post( publicController.postNewSublet )


router
    .route( '/sublet/:id' )

    .get( publicController.getSubletById )


router
    .route( '/user/:id/' )

    .get( publicController.getLimitedUser )

    .post( publicController.contactUser )

module.exports = router
