const express = require( 'express' )
const router = express.Router()

const subletController = require( '../controllers/subletController' )

/**
 * PRIVATE SUBLET ROUTER
 */
router
    .route( '/sublet/:id' )

    .patch( subletController.updateSublet )

    .delete( subletController.deleteSublet )

module.exports = router
