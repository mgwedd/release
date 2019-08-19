const subletService = require( '../services/subletService' )
const userService = require( '../services/userService' )
const getGeocode = require ( '../utils/geocoder' )

/**
 * PUBIC ROUTE CONTROLLERS
 */

exports.getSublets = ( req, res, next ) => {
    const { currentUserMapBounds } = req
    const knexClient = req.app.get( 'knexClient' )
    // involved. will need util functions for sure. 
    // return res.status(200).json('Hello, World. This is the "getSubletsWithinMapBounds" controller speaking.')
    subletService
        .getSubletsWithinMapBounds( currentUserMapBounds, knexClient )
        .then( ( queryResult ) => {
            res.json( queryResult )
        } )
        .catch( next )
}

exports.postNewSublet  = ( req, res, next ) => {
    // const { newSublet } = req
    
    // TODO TEMP
    const newSublet = {
        address : '200 East 66th St, New York NY 10065'
    }

    const knexClient = req.app.get( 'knexClient' )
    // return res.status(200).json('Hello, World. This is the "postNewSublet" controller speaking.')
    subletService
        .postNewSublet( newSublet, knexClient, getGeocode )
        .then( ( queryResult ) => {
            res.json( queryResult )
        } )
        .catch( next )
}

exports.getSubletById  = ( req, res, next ) => {
    const { subletId } = req
    const knexClient = req.app.get( 'knexClient' )
    return res.status(200).json('Hello, World. This is the "getSubletById" controller speaking.')
    // subletService
    //     .getSubletById( subletId, knexClient )
    //     .then( ( queryResult ) => {
    //         res.json( queryResult )
    //     } )
    //     .catch( next )
}

exports.getLimitedUser  = ( req, res, next ) => {
    const { userId } = req
    const knexClient = req.app.get( 'knexClient' )
    return res.status(200).json('Hello, World. This is the "getLimitedUser" controller speaking.')
    // userService
    //     .getLimitedUser( userId, knexClient )
    //     .then( ( queryResult ) => {
    //         res.json( queryResult )
    //     } )
    //     .catch( next )
}

exports.contactUser  = ( req, res, next ) => {
    const { toUserId, fromEmail, message } = req
    const knexClient = req.app.get( 'knexClient' )
    return res.status(200).json('Hello, World. This is the "contactUser" controller speaking.')
    // userService
    //     .contactUser( toUserId, fromEmail, message, knexClient )
    //     .then( ( queryResult ) => {
    //         res.json( queryResult )
    //     } )
    //     .catch( next )
}
