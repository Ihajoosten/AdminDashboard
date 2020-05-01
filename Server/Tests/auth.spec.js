/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const expect = chai.expect;
const requester = require('./config/testConfig');
const constants = require('./config/constants');
const database = require('../Configs/database');
const logger = require('../Configs/config').logger;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/** AUTHENTICATION TESTS - UNIT */
describe('Authentication endpoints tests', () => {

    beforeEach((done) => {
        logger.trace('Before Each called')
        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            logger.trace('hashing new password')
            if (err) { logger.error({ Message: 'Error: ' + err.toString() }); }

            database.executeStatement(constants.createUserQuery(hash), [hash], (err, rows) => {
                if (err) { logger.error('Providing data in tables failed: ' + err.toString()); }
                logger.trace('Created new user')
                done();
            });
        });
    });

    afterEach((done) => {
        logger.trace('After Each called')
        database.executeStatement('DELETE FROM users', [''], (err, rows) => {
            if (err) { logger.error('Cleaning the tables failed: ', err.toString()); }
            logger.trace('Deleted tables')
            done();
        });
    })

    /** Login tests */
    it('Testing correct credentials', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };

        logger.log('Testing POST Login')
        const result = await requester.post('/api/auth/login').send(requestBody);
        
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('token');
        expect(result.body).to.have.property('Message');
        expect(result.body.Message).equal('Logged in successfully!');
    });
});

/** AUTHORIZATION TESTS - UNIT*/

/** AUTHENTICATION TESTS - API*/

/** AUTHENTICATION TESTS - API*/