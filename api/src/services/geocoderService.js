const { GOOGLE_GEOCODING_API_KEY } = require( '../config' )
const errorHandler = require( '../middleware/errorHandler' )

const googleMapsClient = require('@google/maps')
    .createClient(
        {
            key: GOOGLE_GEOCODING_API_KEY,
            Promise : Promise
        } 
    )

const getGeocode = ( address ) => {
    return googleMapsClient
        .geocode( {
            address
        } )
        .asPromise()
        .then( ( response ) => {
            return response
                .json
                .results
        } )
        .catch( ( error ) => {
            errorHandler( error )
    }   )
}

module.exports = {
    getGeocode
}

