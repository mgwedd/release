const express = require( 'express' )
const router = express.Router()

const userController = require( '../controllers/userController' )

router
    .route( '/user/:id' )

    .get( userController.getUser )

    .post( userController.contactUser )

    .patch( userController.updateUser )

    .delete( userController.deleteUser )

module.exports = router
