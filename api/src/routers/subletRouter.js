const express = require( 'express' )
const router = express.Router()

const subletController = require( '../controllers/subletController' )

router
    .route( '/sublet' )

    .get( subletController.getAllSublets ) 

    .post( subletController.postSublet )

router
    .route( '/sublet/:id' )

    .get( subletController.getSubletById )

    .patch( subletController.updateSublet )

    .delete( subletController.deleteSublet )

module.exports = router
