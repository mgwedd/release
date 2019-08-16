const knexClient = require( '../server' )
const getGeocode = require ( '../services/geocoderService' )
const jsonParser = require( 'express' ).json()

const subletService = { 
    getSublets() {
        // db interaction.
        // this is the most involved service. It will need to use POSTGIS.  
    }, 
    getSubletById( subletId ) {
        // is that problem going to happen again 
        // where it tries to translate subletId literally 
        // into the field name? 
        return knexClient
            .select( '*' )
            .from( 'sublets' )
            .where( 'id', subletId )
            .first()
    }, 
    postSublet( newSublet ) {
        const geocode = getGeocode( newSublet.address )
        return knexClient( )
            .insert( { ...newSublet, geocode } )
            .into( 'sublets' )
            .returning( '*' )
            .then( ( rows ) => {
                return rows[0]
            } )
    },
    updateSublet( id, newSubletFields ) {
        return knexClient( 'sublets' )
            .where( { id } )
            .update( { ...newSubletFields }, '*' )
    },
    unlistSublet( subletId ) {
        return knexClient ( 'sublets' )
            .where( { subletId } )
            .delete()
    }
}

module.exports = {
    subletService
}