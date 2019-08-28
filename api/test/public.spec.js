const getGeocode = require('../src/utils/geocoder')
/* eslint-disable no-undef */
const knex = require('knex')
const app = require( '../src/app' )

// Every test should be able to be run in isolation. All tests are self-enclosed. Test envs are pure. 
// Use a watcher script to test your code every time you save a file. 

describe( 'Public endpoints', () => {

    const testUser = {
        full_name : 'Michael Wedd',
        email : 'michael.wedd@gmail.com', 
        password : 'mynewpass',
        phone : '(518) 821-4021'
    }

    // Setup, config, and cleanup after tests.
    let db

    before('Make knex instance', () => {
        db = knex({
            client : 'pg', 
            connection : process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    
    after('disconnect from db', () => db.destroy())
    
    before('cleanup', () => db('release-test').truncate())
    
    afterEach('cleanup', () => db('release-test').truncate())
    
    beforeEach( 'Add a test user to the db', ( done ) => {
        supertest( app )
            .post( testUser )
            .expect( 200 )
            // now we have a user. save that user out in the enviro`nment. Check out "done". Like await. 
    })

    describe( '/sublet endpoint', () => {

        const geocode = getGeocode( '43 south stricker st., Baltimore MD 21223' )
        console.log('lon and lat ', geocode)
        const testSublet = {
            owner : testUser.id,
            title : 'Test Sublet',
            address : '43 south stricker st., Baltimore MD 21223', 
            description : 'A great place to run an Air BnB', 
            num_rooms : 1, 
            num_sleeps : 3, 
            end_date : new Date( '2019/10/01' ), 
        }
        console.log('About to post this test sublet to the database ', testSublet )
        
        it.only( 'POST /sublet should create a geomarker in the database', () => {
           return supertest(app)
            .post('/api/public/user')
            .send(testSublet)
            .expect(200)
            .expect( ( res ) => {
                expect( res.body ).to.have.property( 'id' )
                expect( res.body.owner ).to.eql( testUser.id )
                expect( res.body.title ).to.eql( testSublet.title )
                expect( res.body.description ).to.eql( testSublet.description )
                expect( res.body.num_rooms ).to.eql( testSublet.num_rooms )
                expect( res.body.num_sleeps ).to.eql( testSublet.num_rooms )
                expect( res.body.lon ).to.eql( testSublet.lon )
                expect( res.body.lat ).to.eql( testSublet.lat )
                expect( res.body ).to.have.property( 'geo_marker' )
                expect( res.body.geo_marker ).to.eql( 'geo_marker' )
                expect( res.headers.location ).to.eql( `/api/public/sublet/${res.body.id}` )
                const expectedDate = new Date().toLocaleString( 'en', { timeZone : 'UTC' } )
                const actualDate = new Date( res.body.posted_date ).toLocaleString()
                expect( actualDate ).to.eql( expectedDate )
            })
        })
    })
    
    describe( '/sublet/:id endpoint', () => {
    })
    
    describe( '/user/:id endpoint', () => {
    })

})

// could do another level of describes for each method on each endpoint. 


// router
//     .route( '/sublet' )

//     .get( publicController.getSublets )

//     .post( publicController.postNewSublet )


// router
//     .route( '/sublet/:id' )

//     .get( publicController.getSubletById )


// router
//     .route( '/user/:id/' )

//     .get( publicController.getLimitedUser )

//     .post( publicController.contactUser )