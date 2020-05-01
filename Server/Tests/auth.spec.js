/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const expect = chai.expect;
const requester = require('./config/testConfig');
const constants = require('./config/constants');
const database = require('../src/Configs/database');
const logger = require('../src/Configs/config').logger;
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

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(200);
        expect(result.body).to.have.property('token');
        expect(result.body).to.have.property('Message');
        expect(result.body.Message).equal('Logged in successfully!');
    });

    it('Testing wrong email', async () => {
        const requestBody = {
            email: 'Testing@gmail.comm',
            password: 'TestPassword123!'
        };

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(404);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('Message');
        expect(result.body.Message).equal('Email does not exist!');
    });

    it('Testing wrong password', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword!'
        };

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(404);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('Message');
        expect(result.body.Message).equal('Invalid password!');
    });

    it('Testing empty password', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: ''
        };

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('Message');
        expect(result.body.Message).equal('Bad Request - password was undefined');
    });

    it('Testing empty email', async () => {
        const requestBody = {
            email: '',
            password: 'TestPassword!'
        };

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('Message');
        expect(result.body.Message).equal('Bad Request - email was undefined');
    });

    it('Testing empty body', async () => {
        const requestBody = {

        };

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('Message');
        expect(result.body.Message).equal('Bad Request - body was undefined');
    });

    /** Get User By ID */
    it('Testing with correct ID but no Auth header', async () => {

        const result = await requester.get('/api/auth/get-user/247');

        expect(result).to.have.status(401);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('Message');
        expect(result.body).to.have.property('code');
        expect(result.body.Message).equal('No authorization header included');
        expect(result.body.code).equal(401);
    });

    it('Testing with correct ID and Auth Header but invalid token', async () => {

        const result = await requester.get('/api/auth/get-user/247').set('Authorization', '50');

        expect(result).to.have.status(401);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('Message');
        expect(result.body).to.have.property('code');
        expect(result.body.Message).equal('Not authorized');
        expect(result.body.code).equal(401);
    });
});

/** AUTHORIZATION TESTS - UNIT*/

/** AUTHENTICATION TESTS - API*/

/** AUTHENTICATION TESTS - API*/