/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const expect = chai.expect;
const requester = require('./config/testConfig');
const constants = require('./config/constants');
const database = require('../src/Configs/database');
const logger = require('../src/Configs/config').logger;
const bcrypt = require('bcrypt');

/** Create company tests */
describe('Create company tests', () => {

    beforeEach((done) => {

        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }

            database.executeStatement(constants.createUserQuery(hash), [hash], (error, result) => {
                if (error) { logger.error('Providing data in tables failed: ' + err.toString()); return; }

                database.executeStatement(constants.createCompanyQuery(), ['newCompany'], (err, rows) => {
                    if (err) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                    done();
                });
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (error, result) => {
            if (error) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
            database.executeStatement('DELETE FROM companies', [''], (err, rows) => {
                if (err) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
                done();
            });
        });
    });

    it('Testing create new company', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Adidas",
            branch: "Sales",
            department: "Breda",
            email: "info@adidas.com",
            phone: "04935718762"
        }

        const result = await requester.post('/api/company/create').set('Authorization', 'Bearer ' + user.body.token).send(body);
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('message');
        expect(result.body).to.have.property('object');
    });

    it('Testing create new company - invalid token', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Adidas",
            branch: "Sales",
            department: "Breda",
            email: "info@adidas.com",
            phone: "04935718762"
        }

        const result = await requester.post('/api/company/create').set('Authorization', 'Bearer ').send(body);
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Not authorized');
    });

    it('Testing create new company - no header', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Adidas",
            branch: "Sales",
            department: "Breda",
            email: "info@adidas.com",
            phone: "04935718762"
        }

        const result = await requester.post('/api/company/create').send(body);
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('No authorization header included');
    });

    it('Testing create new company - no body', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const result = await requester.post('/api/company/create').set('Authorization', 'Bearer ' + user.body.token).send({});

        expect(result).to.have.status(400);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Undefined name');
    });

    it('Testing create new company - no branch', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Adidas"
        }
        const result = await requester.post('/api/company/create').set('Authorization', 'Bearer ' + user.body.token).send(body)

        expect(result).to.have.status(400);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Undefined branch');
    });

    it('Testing create new company - no department', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Adidas",
            branch: 'TestBranch'
        }
        const result = await requester.post('/api/company/create').set('Authorization', 'Bearer ' + user.body.token).send(body)

        expect(result).to.have.status(400);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Undefined department');
    });

    it('Testing create new company - no email', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Adidas",
            branch: "Sales",
            department: "Breda",
        }
        const result = await requester.post('/api/company/create').set('Authorization', 'Bearer ' + user.body.token).send(body)

        expect(result).to.have.status(400);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Undefined email');
    });

    it('Testing create new company - no phone', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Adidas",
            branch: 'TestBranch',
            department: 'Breda',
            email: "info@adidas.com"
        }
        const result = await requester.post('/api/company/create').set('Authorization', 'Bearer ' + user.body.token).send(body)

        expect(result).to.have.status(400);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Undefined phone');
    });
});

/** GET company by ID */
describe('Get company tests', () => {

    beforeEach((done) => {

        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }

            database.executeStatement(constants.createUserQuery(hash), [hash], (error, result) => {
                if (error) { logger.error('Providing data in tables failed: ' + err.toString()); return; }

                database.executeStatement(constants.createCompanyQuery(), ['newCompany'], (err, rows) => {
                    if (err) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                    done();
                });
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (error, result) => {
            if (error) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
            database.executeStatement('DELETE FROM companies', [''], (err, rows) => {
                if (err) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
                done();
            });
        });
    });

    it('Testing get company', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/company/247').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('result');
        expect(result.body).to.have.property('token');
    });

    it('Testing get not existing company', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/company/9999').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(404);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Invalid Company!');
    });

    it('Testing wrong url', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/company/247/test').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(404);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Not found error: 404');
    });

    it('Testing invalid credentials', async () => {
        const requestBody = {
            email: 'Test@gmail.nl',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/company/247').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Not authorized');
    });

    it('Testing no header set', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/company/247');
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('No authorization header included');
    });
});

/** GET ALL companies */
describe('Get all companies tests', () => {

    beforeEach((done) => {

        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }

            database.executeStatement(constants.createUserQuery(hash), [hash], (error, result) => {
                if (error) { logger.error('Providing data in tables failed: ' + err.toString()); return; }

                database.executeStatement(constants.createCompanyQuery(), ['newCompany'], (err, rows) => {
                    if (err) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                    done();
                });
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (error, result) => {
            if (error) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
            database.executeStatement('DELETE FROM companies', [''], (err, rows) => {
                if (err) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
                done();
            });
        });
    });

    it('Testing get company', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/company/all').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('result');
        expect(result.body).to.have.property('token');
    });

    it('Testing get not existing company', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        database.executeStatement('DELETE FROM companies', [''], async (err, rows) => {
            const result = await requester.get('/api/company/all').set('Authorization', 'Bearer ' + user.body.token);
            expect(result).to.have.status(404);
            expect(result.body).to.have.property('message');
            expect(result.body.message).equal('No companies found');
        });
    });

    it('Testing wrong url', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/company/all/sdf').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(404);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Not found error: 404');
    });

    it('Testing invalid credentials', async () => {
        const requestBody = {
            email: 'Test@gmail.nl',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/company/all').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Not authorized');
    });

    it('Testing no header set', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/company/all');
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('No authorization header included');
    });
});

/** UPDATE company */
describe('Update company tests', () => {

    beforeEach((done) => {

        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }
            database.executeStatement(constants.createUserQuery(hash), [hash], (error, result) => {
                if (error) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                database.executeStatement(constants.createCompanyQuery(), ['newCompany'], (err, rows) => {
                    if (err) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                    done();
                });
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (error, result) => {
            if (error) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
            database.executeStatement('DELETE FROM companies', [''], (err, rows) => {
                if (err) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
                done();
            });
        });
    });

    it('Testing with valid credentials', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const body = {
            name: 'Nike',
            branch: 'Marketing',
            department: 'Eindhoven',
            email: 'info@nike.nl',
            phone: '112'
        }

        const result = await requester.put('/api/company/edit/247').set('Authorization', 'Bearer ' + user.body.token).send(body);
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('result');
        expect(result.body).to.have.property('token');
    });

    it('Testing wrong url', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.put('/api/company/edit/sdf').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(404);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Invalid Company!');
    });

    it('Testing invalid credentials', async () => {
        const requestBody = {
            email: 'Test@gmail.nl',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.put('/api/company/edit/247').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Not authorized');
    });

    it('Testing no header set', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.put('/api/company/edit/247');
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('No authorization header included');
    });

});

describe('Deleting company tests', () => {

    beforeEach((done) => {

        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }
            database.executeStatement(constants.createUserQuery(hash), [hash], (error, result) => {
                if (error) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                database.executeStatement(constants.createCompanyQuery(), ['newCompany'], (err, rows) => {
                    if (err) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                    done();
                });
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (error, result) => {
            if (error) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
            database.executeStatement('DELETE FROM companies', [''], (err, rows) => {
                if (err) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
                done();
            });
        });
    });

    it('Testing with valid credentials', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        
        const result = await requester.delete('/api/company/delete/247').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('result');
        expect(result.body).to.have.property('token');
    });

    it('Testing with valid credentials but non existing company', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        
        const result = await requester.delete('/api/company/delete/2473').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(404);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Invalid Company!');
    });
})