## =-=-= RELEASE RESTful API SERVER =-=-=

This Node/Express server supports the ReLease full-stack project.
It exposes several public and private endpoints for clients to 
CRUD sublet properties and users. It also enables unregistered users 
to contact registered sublet listers via an email service. The server uses
a JWT authentication scheme for its private routes. The server interfaces with 
a postgres database through Knex and a Redis caching layer on top of the database
to enable the client's map-based UI to be performant given the volume of queries 
a map-based UI can require. 

## =-=-= ENDPOINTS =-=-=

#### = PUBLIC ENDPOINTS =

**1. GET /user/:user_id**
    limited info on user

**1. GET /sublet**
    # pass query params to endpoint for search with GET method. default is lat/lon of users current location, which is asked for upon load.

    Add an if in the router that checks for search params, otherwise returns all. 

**2. GET /sublet/:property_id**
    # standard get by property id. see "property" datamodel.

**3. POST /user/:user_id/contact**
    # contact owner of property via post. See "contact" datamodel.

**4. POST /sublet**
    # Essentially a "sign up" screen where someone will create their user account, 
    built on the "user" datamodel, and in the same process also post their sublet, which 
    uses the "property" datamodel. This is a public endpoint for posting, but private for any 
    other method like updating or deleting.

    If the user is logged in, then the form will hide any "create user" fields and substitute 
    the user_id behind the scenes on this server, binding the existing user_id to the property's owner field.

**4. POST /user**
    NOTE: take all user registration off of the post sublet, and then just make sync calls from the UI
    to this endpoint and then to the post sublet one, referencing this user id. 

    FOr UX, page one is post user. Then, page two of the react form is for property posting. 
    Post the user on the page change, then get uid back.

    If user is logged into client, bypass this. 

#### =-=-= PRIVATE ENDPOINTS =-=-= 

**1. GET /user/:user_id**
    full info on the user, for account page. 

**1. PATCH /user**
    NOTE: take all user registration off of the post sublet, and then just make sync calls from the UI
    to this endpoint and then to the post sublet one, referencing this user id. 

    FOr UX, page one is post user. Then, page two of the react form is for property posting. 
    Post the user on the page change, then get uid back.

**2. PATCH, DELETE /sublet/:property_id**
    # Requires the user to be logged in and be the owner of the property in question. 

### =-=-= DATA MODELS =-=-=

#### = SUBLET =

{
    "sublet_id": "uuid, AUTO",
    "title": "string, name of property listing, REQUIRED", 
    "owner": "foreign key of user who posted the property, REQUIRED",
    "address": "string, address, will be converted to lat/long by G maps api, REQUIRED", 
    "description": "string, description of listing/situation", 
    "num_rooms": "float, number of rooms available, REQUIRED", 
    "num_sleeps": "integer, number of people the apt can accomodate", 
    "start_date": "date, start of listing availability, REQUIRED", 
    "end_date": "date, end of listing availability, REQUIRED", 
    "posted_date": "date, when the listing was posted, AUTO"
}

#### = USER =

{
    "user_id": "uuid, AUTO", 
    "full_name": "string, REQUIRED", 
    "email": "string, email, REQUIRED", 
    "phone": "number, REQUIRED", 
    "joined": "date, AUTO", 
    "deactivated": "date, USER INPUT"
}

#### = CONTACT =

{
    "id" "primary key"
    "sender": "string, email address of sender", 
    "recipient": "foreign key of property owner, user_id", 
    "property_id": "foreign key, property_id of property thats subject",  
    "message": "string, not null"
}
