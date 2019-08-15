const express = require( 'express' )
const router = express.Router()

const userController = require( '../controllers/userController' )

/**
 * PRIVATE USER ROUTES
 */ 

router
    .route( '/user/:id' )

    .get( userController.getFullUser )

    .patch( userController.updateUser )

    .delete( userController.deleteUser )

module.exports = router
