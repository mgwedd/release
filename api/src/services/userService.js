
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
    contactUser( toUserId, fromEmail, message ) {
        // https://nodemailer.com/about/
        // pass user info to mailservice to send. 
        // this service method is here as a pass through for 
        // conceptual/design reasins. For coherence of user model.
    }
}

module.exports = userService