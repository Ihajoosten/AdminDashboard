/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const expect = chai.expect;
const requester = require('./config/testConfig');
const constants = require('./config/constants');
const database = require('../src/Configs/database');
const logger = require('../src/Configs/config').logger;
const bcrypt = require('bcrypt');

/** Create product tests */
describe('Create product tests', () => {

    beforeEach((done) => {

        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }

            database.executeStatement(constants.createUserQuery(hash), [hash], (error, result) => {
                if (error) { logger.error('Providing data in tables failed: ' + err.toString()); return; }

                database.executeStatement(constants.createProductQuery(), ['newproduct'], (err, rows) => {
                    if (err) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                    done();
                });
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (error, result) => {
            if (error) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
            database.executeStatement('DELETE FROM products', [''], (err, rows) => {
                if (err) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
                done();
            });
        });
    });

    it('Testing create new product', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Wireless keyboard",
            description: "Sales",
            price: 21.99,
            brand: "Logitechhh",
            dateReleased: "01-01-2020"
        }

        const result = await requester.post('/api/product/create').set('Authorization', 'Bearer ' + user.body.token).send(body);
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('result');
        expect(result.body).to.have.property('token');
    });

    it('Testing create new product - invalid token', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Wireless keyboard",
            description: "Sales",
            price: 21.99,
            brand: "Logitechhh",
            dateReleased: "01-01-2020"
        }

        const result = await requester.post('/api/product/create').set('Authorization', 'Bearer ').send(body);
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Not authorized');
    });

    it('Testing create new product - no header', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Wireless keyboard",
            description: "Sales",
            price: 21.99,
            brand: "Logitechhh",
            dateReleased: "01-01-2020"
        }

        const result = await requester.post('/api/product/create').send(body);
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('No authorization header included');
    });

    it('Testing create new product - no body', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const result = await requester.post('/api/product/create').set('Authorization', 'Bearer ' + user.body.token).send({});

        expect(result).to.have.status(400);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Undefined name');
    });

    it('Testing create new product - no description', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Adidas"
        }
        const result = await requester.post('/api/product/create').set('Authorization', 'Bearer ' + user.body.token).send(body)

        expect(result).to.have.status(400);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Undefined description');
    });

    it('Testing create new product - no price', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Adidas",
            description: 'TestBranch'
        }
        const result = await requester.post('/api/product/create').set('Authorization', 'Bearer ' + user.body.token).send(body)

        expect(result).to.have.status(400);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Undefined price');
    });

    it('Testing create new product - no brand', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Adidas",
            description: "Sales",
            price: 22
        }
        const result = await requester.post('/api/product/create').set('Authorization', 'Bearer ' + user.body.token).send(body)

        expect(result).to.have.status(400);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Undefined brand');
    });

    it('Testing create new product - no dateReleased', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);
        const body = {
            name: "Adidas",
            description: 'TestBranch',
            price: 77,
            brand: "adidas"
        }
        const result = await requester.post('/api/product/create').set('Authorization', 'Bearer ' + user.body.token).send(body)

        expect(result).to.have.status(400);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Undefined dateReleased');
    });
});

/** GET product by ID */
describe('Get product tests', () => {

    beforeEach((done) => {

        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }

            database.executeStatement(constants.createUserQuery(hash), [hash], (error, result) => {
                if (error) { logger.error('Providing data in tables failed: ' + err.toString()); return; }

                database.executeStatement(constants.createProductQuery(), ['newproduct'], (err, rows) => {
                    if (err) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                    done();
                });
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (error, result) => {
            if (error) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
            database.executeStatement('DELETE FROM products', [''], (err, rows) => {
                if (err) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
                done();
            });
        });
    });

    it('Testing get product', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        database.executeStatement(constants.createProductQuery, ['newProduct'], async (err, rows) => {
            const result = await requester.get('/api/product/247').set('Authorization', 'Bearer ' + user.body.token);
            expect(result).to.have.status(200);
            expect(result.body).to.have.property('result');
            expect(result.body).to.have.property('token');
        });
    });

    it('Testing get not existing product', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/product/9999').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(404);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Invalid Product!');
    });

    it('Testing wrong url', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/product/247/test').set('Authorization', 'Bearer ' + user.body.token);
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

        const result = await requester.get('/api/product/247').set('Authorization', 'Bearer ' + user.body.token);
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

        const result = await requester.get('/api/product/247');
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

                database.executeStatement(constants.createProductQuery(), ['newproduct'], (err, rows) => {
                    if (err) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                    done();
                });
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (error, result) => {
            if (error) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
            database.executeStatement('DELETE FROM products', [''], (err, rows) => {
                if (err) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
                done();
            });
        });
    });

    it('Testing get products', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/product/all').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('result');
        expect(result.body).to.have.property('token');
    });

    it('Testing get not existing product', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        database.executeStatement('DELETE FROM products', [''], async (err, rows) => {
            const result = await requester.get('/api/product/all').set('Authorization', 'Bearer ' + user.body.token);
            expect(result).to.have.status(404);
            expect(result.body).to.have.property('message');
            expect(result.body.message).equal('No products found');
        });
    });

    it('Testing wrong url', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.get('/api/product/all/sdf').set('Authorization', 'Bearer ' + user.body.token);
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

        const result = await requester.get('/api/product/all').set('Authorization', 'Bearer ' + user.body.token);
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

        const result = await requester.get('/api/product/all');
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('No authorization header included');
    });
});

/** UPDATE product */
describe('Update product tests', () => {

    beforeEach((done) => {

        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }
            database.executeStatement(constants.createUserQuery(hash), [hash], (error, result) => {
                if (error) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                database.executeStatement(constants.createProductQuery(), ['newproduct'], (err, rows) => {
                    if (err) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                    done();
                });
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (error, result) => {
            if (error) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
            database.executeStatement('DELETE FROM products', [''], (err, rows) => {
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

        const result = await requester.put('/api/product/edit/247').set('Authorization', 'Bearer ' + user.body.token).send(body);
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

        const result = await requester.put('/api/product/edit/sdf').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(404);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Invalid Product!');
    });

    it('Testing invalid credentials', async () => {
        const requestBody = {
            email: 'Test@gmail.nl',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.put('/api/product/edit/247').set('Authorization', 'Bearer ' + user.body.token);
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

        const result = await requester.put('/api/product/edit/247');
        expect(result).to.have.status(401);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('No authorization header included');
    });

});

describe('Deleting product tests', () => {

    beforeEach((done) => {

        bcrypt.hash('TestPassword123!', 10, (err, hash) => {
            if (err) { logger.error({ message: 'Error: ' + err.toString() }); }
            database.executeStatement(constants.createUserQuery(hash), [hash], (error, result) => {
                if (error) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                database.executeStatement(constants.createProductQuery(), ['newproduct'], (err, rows) => {
                    if (err) { logger.error('Providing data in tables failed: ' + err.toString()); return; }
                    done();
                });
            });
        });
    });

    afterEach((done) => {
        database.executeStatement('DELETE FROM users', [''], (error, result) => {
            if (error) { logger.error('Cleaning the tables failed: ', err.toString()); return; }
            database.executeStatement('DELETE FROM products', [''], (err, rows) => {
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

        const result = await requester.delete('/api/product/delete/247').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('result');
        expect(result.body).to.have.property('token');
    });

    it('Testing with valid credentials but non existing product', async () => {
        const requestBody = {
            email: 'Test@gmail.com',
            password: 'TestPassword123!'
        };
        const user = await requester.post('/api/auth/login').send(requestBody);

        const result = await requester.delete('/api/product/delete/2473').set('Authorization', 'Bearer ' + user.body.token);
        expect(result).to.have.status(404);
        expect(result.body).to.have.property('message');
        expect(result.body.message).equal('Invalid Product!');
    });
})