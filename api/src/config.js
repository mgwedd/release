module.exports = {
    PORT : process.env.PORT || 8000,
    NODE_ENV : process.env.NODE_ENV || 'development',
    JWT_SECRET : process.env.JWT_SECRET || null,
    DATABASE_URL : process.env.DATABASE_URL || 'postgresql://michael@localhost/release',
    REDIS_URL : process.env.PROD_REDIS_URL || '127.0.0.1:6379',
    TEST_DB_URL : process.env.TEST_DB_URL || 'postgresql://michael@localhost/release-test', 
    GOOGLE_GEOCODING_API_KEY : process.env.GOOGLE_GEOCODING_API_KEY || 'You forgot to add your Google Geocoding API Key to this environment!'
}