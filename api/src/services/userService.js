const bcrypt = require('bcrypt')
const xss = require( 'xss' )

const userService = {
    getLimitedUser( userId ) {
        // return only image and name etc. 
    }, 
    getFullUser( userId ) {

    }, 
    updateUser( newUserFields ) {

    }, 
    deleteUser( userId ) {

    }, 
    hashPassword( password ) {
        return bcrypt.hash( password, 12 )
    },
    insertUser( knexClient, newUser ) {
    return knexClient
        .insert( newUser )
        .into( 'users' )
        .returning( '*' )
        .then( ( [ user ] ) => user )
    },
    serializeUser( user ) {
        return {
          id : user.id
        }
    },
    contactUser( toUserId, fromEmail, message ) {
        // https://nodemailer.com/about/
        // pass user info to mailservice to send. 
        // this service method is here as a pass through for 
        // conceptual/design reasins. For coherence of user model.
    }
}

module.exports = userService