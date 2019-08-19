const { GOOGLE_GEOCODING_API_KEY } = require( '../config' )
const errorHandler = require( '../middleware/errorHandler' )

const googleMapsClient = require( '@google/maps' )
    .createClient(
        {
            key: GOOGLE_GEOCODING_API_KEY,
            Promise: Promise
        } 
    )

const getGeocode = ( address ) => {
    return googleMapsClient
        .geocode( {
            address
        } )
        .asPromise()
        .then( ( response ) => {
            return response.json.results[0].geometry.location || { lon : '36.9122', lat : '79.1231'}
          })
        .catch(( err ) => {
            errorHandler( err )
        })
}

module.exports = getGeocode 