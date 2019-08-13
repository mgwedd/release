module.exports = {
    PORT : process.env.PORT || 8000,
    NODE_ENV : process.env.NODE_ENV,
    JWT_SECRET : process.env.JWT_SECRET,
    DB_URL : process.env.DATABASE_URL || 'postgresql://michael@localhost/release',
    TEST_DB_URL : process.env.TEST_DB_URL
}