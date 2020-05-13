/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const expect = chai.expect;
const requester = require('./config/testConfig');
const constants = require('./config/constants');
const database = require('../src/Configs/database');
const logger = require('../src/Configs/config').logger;
const bcrypt = require('bcrypt');

/** Login User tests */
describe('Login User tests', () => {

    beforeEach((done) => {
        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }

            database.executeStatement(constants.createUserQuery(hash), [hash], (err, rows) => {
                if (err) { logger.error('Providing data in tables failed: ' + err.toString()); }
                done();
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (err, rows) => {
            if (err) { logger.error('Cleaning the tables failed: ', err.toString()); }
            done();
        });
    })

    it('Testing correct credentials', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(200);
        expect(result.body).to.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Logged in successfully!');
    });

    it('Testing wrong email', async () => {
        const requestBody = {
            email: 'Testing@gmail.comm',
            password: 'TestPassword123!'
        };

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(401);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Email does not exist!');
    });

    it('Testing wrong password', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword!'
        };

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(401);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Invalid password!');
    });

    it('Testing empty password', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: ''
        };

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Bad Request - password was undefined');
    });

    it('Testing empty email', async () => {
        const requestBody = {
            email: '',
            password: 'TestPassword!'
        };

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Bad Request - email was undefined');
    });

    it('Testing empty body', async () => {
        const requestBody = {

        };

        const result = await requester.post('/api/auth/login').send(requestBody);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Bad Request - body was undefined');
    });
});


/** Login tests */
describe('GetUserByID tests', () => {

    beforeEach((done) => {
        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }

            database.executeStatement(constants.createUserQuery(hash), [hash], (err, rows) => {
                if (err) { logger.error('Providing data in tables failed: ' + err.toString()); }
                done();
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (err, rows) => {
            if (err) { logger.error('Cleaning the tables failed: ', err.toString()); }
            done();
        });
    });

    /** Get User By ID */
    it('Testing with correct ID but no Auth header', async () => {

        const result = await requester.get('/api/auth/get-user/247');

        expect(result).to.have.status(401);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body).to.have.property('code');
        expect(result.body.message).equal('No authorization header included');
        expect(result.body.code).equal(401);
    });

    it('Testing with correct ID and Auth Header but invalid token', async () => {

        const result = await requester.get('/api/auth/get-user/247').set('Authorization', '50');

        expect(result).to.have.status(401);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body).to.have.property('code');
        expect(result.body.message).equal('Not authorized');
        expect(result.body.code).equal(401);
    });

    it('Testing with correct ID and Auth Header with valid token', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };

        const signedInUser = await requester.post('/api/auth/login').send(requestBody);
        const result = await requester.get('/api/auth/get-user/247').set('Authorization', 'Bearer ' + signedInUser.body.token);

        expect(result).to.have.status(200);
        expect(result.body).to.have.property('result');
        expect(result.body.result[0].Email).equal('Test@gmail.com');
        expect(bcrypt.compareSync('TestPassword123!', result.body.result[0].Password)).equal(true);
    });

    it('Testing error response', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };

        const signedInUser = await requester.post('/api/auth/login').send(requestBody);
        const result = await requester.get('/api/auth/get-user/Invalid').set('Authorization', 'Bearer ' + signedInUser.body.token);

        expect(result).to.have.status(500);
        expect(result.body).to.have.property('message');
    });

});


/** Register user tests */
describe('Register User tests', () => {

    beforeEach((done) => {
        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }

            database.executeStatement(constants.createUserQuery(hash), [hash], (err, rows) => {
                if (err) { logger.error('Providing data in tables failed: ' + err.toString()); }
                done();
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (err, rows) => {
            if (err) { logger.error('Cleaning the tables failed: ', err.toString()); }
            done();
        });
    });

    it('Testing register user with correct data', async () => {
        const newUser = {
            firstname: 'Firstname',
            lastname: 'Lastname',
            email: 'NewTest@gmail.com',
            birthday: '14-12-2000',
            phone: '0679410987',
            password: 'TestPassword123!'
        }

        const result = await requester.post('/api/auth/register').send(newUser);

        expect(result).to.have.status(200);
        expect(result.body.result).to.have.property('affectedRows');
        expect(result.body.result.affectedRows).equal(1);
    });

    it('Testing email already taken', async () => {
        const newUser = {
            firstname: 'Firstname',
            lastname: 'Lastname',
            email: 'Test@gmail.com',
            birthday: '14-12-2000',
            phone: '0679410987',
            password: 'TestPassword123!'
        }

        const result = await requester.post('/api/auth/register').send(newUser);

        expect(result).to.have.status(409);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Email already taken!');
    });

    it('Testing undefined firstname', async () => {
        const newUser = {
            firstname: ''
        }

        const result = await requester.post('/api/auth/register').send(newUser);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Bad Request - firstname was undefined');
    });

    it('Testing undefined lastname', async () => {
        const newUser = {
            firstname: 'Testing',
            lastname: ''
        }

        const result = await requester.post('/api/auth/register').send(newUser);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Bad Request - lastname was undefined');
    });

    it('Testing undefined email', async () => {
        const newUser = {
            firstname: 'Testing',
            lastname: 'TestingToo',
            email: ''
        }

        const result = await requester.post('/api/auth/register').send(newUser);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Bad Request - email was undefined');
    });

    it('Testing undefined birthday', async () => {
        const newUser = {
            firstname: 'Testing',
            lastname: 'TestingToo',
            email: 'TestingThisEmail@gmail.com',
            birthday: ''
        }

        const result = await requester.post('/api/auth/register').send(newUser);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Bad Request - birthday was undefined');
    });

    it('Testing undefined phone', async () => {
        const newUser = {
            firstname: 'Testing',
            lastname: 'TestingToo',
            email: 'TestingThisEmail@gmail.com',
            birthday: '14-12-1999',
            phone: ''
        }

        const result = await requester.post('/api/auth/register').send(newUser);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Bad Request - phone was undefined');
    });

    it('Testing undefined password', async () => {
        const newUser = {
            firstname: 'Testing',
            lastname: 'TestingToo',
            email: 'TestingThisEmail@gmail.com',
            birthday: '14-12-1999',
            phone: '112',
            password: ''
        }

        const result = await requester.post('/api/auth/register').send(newUser);

        expect(result).to.have.status(400);
        expect(result.body).to.not.have.property('token');
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Bad Request - password was undefined');
    });
});


/** Update User tests */
describe('Update User tests', () => {

    beforeEach((done) => {
        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }

            database.executeStatement(constants.createUserQuery(hash), [hash], (err, rows) => {
                if (err) { logger.error('Providing data in tables failed: ' + err.toString()); }
                done();
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (err, rows) => {
            if (err) { logger.error('Cleaning the tables failed: ', err.toString()); }
            done();
        });
    });

    it('Testing with invalid email', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };

        const resetPassBody = {
            email: 'Test@gmail.nl',
            oldPassword: 'TestPassword123!',
            newPassword: 'TestingNewPassword123!'
        };

        const signedInUser = await requester.post('/api/auth/login').send(requestBody);
        const result = await requester.patch('/api/auth/reset-password').set('Authorization', 'Bearer ' + signedInUser.body.token).send(resetPassBody);

        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Invalid Email!');
    });

    it('Testing with invalid url', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };

        const resetPassBody = {
            email: 'Test@gmail.nl',
            oldPassword: 'TestPassword123!',
            newPassword: 'TestingNewPassword123!'
        };

        const signedInUser = await requester.post('/api/auth/login').send(requestBody);
        const result = await requester.patch('/api/auth/reset-password/247').set('Authorization', 'Bearer ' + signedInUser.body.token).send(resetPassBody);

        expect(result).to.have.status(404);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Not found error: 404');
    });

    it('Testing with invalid oldPassword', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };

        const resetPassBody = {
            email: 'Test@gmail.com',
            oldPassword: 'TestPassword12asdfasdfsadf3!',
            newPassword: 'TestingNewPassword123!'
        };

        const signedInUser = await requester.post('/api/auth/login').send(requestBody);
        const result = await requester.patch('/api/auth/reset-password').set('Authorization', 'Bearer ' + signedInUser.body.token).send(resetPassBody);

        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('old password is invalid!');
    });

    it('Testing with valid credentials', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };

        const resetPassBody = {
            email: 'Test@gmail.com',
            oldPassword: 'TestPassword123!',
            newPassword: 'TestingNewPassword123!'
        };

        const signedInUser = await requester.post('/api/auth/login').send(requestBody);
        const result = await requester.patch('/api/auth/reset-password').set('Authorization', 'Bearer ' + signedInUser.body.token).send(resetPassBody);

        expect(result).to.have.status(200);
        expect(result.body).to.have.property('result');
        expect(result.body).to.have.property('token');
    });
});