const utils = require('../utils/geocoder')

const subletService = { 
    getSubletsWithinMapBounds( currentUserMapBounds, knexClient ) {
        // db interaction.
        // if no map bounds given, return all sublets as a result. 
        // attempt to insert the cached last bounds into a query for the new bounds — 
        // the subset of the new bounds that is what the last bounds were, assuming the user zoomed in or out and still has some of the last bounds on screen. 
        // otherwise, do a coordinate lookup for geo_marker entries that fall within the current bounds. 
        // return an array of those markers and the associated properties as well, so the user can see previews on the map without waitin for another query to get property info.
        return knexClient
            .select( '*' )
            .from( 'sublets' )
    }, 
    getSubletById( subletId, knexClient ) {
        // is that problem going to happen again 
        // where it tries to translate subletId literally 
        // into the field name? 
        return knexClient
            .select( '*' )
            .from( 'sublets' )
            .where( 'id', subletId )
            .first()
    }, 
    postNewSublet( newSublet, knexClient, getGeocode ) {
        const st = knexClient.postgis // "st" stands for spatial type postgis functions

        const geocodedAddress = new Promise( ( resolve, reject ) => {
            const geocode = getGeocode( newSublet.address )
            resolve(geocode)
            reject('Unable to post sublet. Please try again.')
        } )
            
        return geocodedAddress
            .then( () => {
                newSublet.lon = geocodedAddress.lng
                newSublet.lat = geocodedAddress.lat
            } )
            .then( () => {

                knexClient
                    .insert( 
                        { 
                            ...newSublet, 
                            geo_marker : st.makePoint( newSublet.lon, newSublet.lat ) 
                        } 
                    )
                    .into( 'sublets' )
                    .returning( '*' )
                    .then( ( rows ) => {
                        return rows[0]
                    } )
            } )
    },
    updateSublet( id, newSubletFields, knexClient ) {
        return knexClient( 'sublets' )
            .where( { id } )
            .update( { ...newSubletFields }, '*' )
    },
    unlistSublet( subletId, knexClient ) {
        return knexClient ( 'sublets' )
            .where( { subletId } )
            .delete()
    }
}

module.exports = subletService
