/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const User = require('../src/Models/user.models');
const Invoice = require('../src/Models/invoice.models');
const Company = require('../src/Models/company.models');
const Balance = require('../src/Models/balance.models');
const Product = require('../src/Models/product.models');
const Transaction = require('../src/Models/transaction.models');
const assert = require('assert');
var user;
var otherUser;

describe('User model UNIT TESTS', () => {

    beforeEach(() => {
        user = new User(
            1,
            'testFirst',
            'testLast',
            'Testing@outlook.com',
            '01-01-2020',
            '0648941022',
            'TestPassword!'
        );

        otherUser = new User(
            2,
            'FirstTest',
            'LastTest',
            'Testing@gmail.com',
            '01-01-2021',
            '0648234523',
            'TestPassword123!'
        );
    });

    it('Testing correct model', async () => {

        assert.equal(1, user.id);
        assert.equal('testFirst', user.firstname);
        assert.equal('testLast', user.lastname);
        assert.equal('Testing@outlook.com', user.email);
        assert.equal('01-01-2020', user.birthday);
        assert.equal('0648941022', user.phone);
        assert.equal('TestPassword!', user.password);
    });

    it('Testing incorrect model', async () => {

        assert.notEqual(1, otherUser.id);
        assert.notEqual('testFirst', otherUser.firstname);
        assert.notEqual('testLast', otherUser.lastname);
        assert.notEqual('Testing@outlook.com', otherUser.email);
        assert.notEqual('01-01-2020', otherUser.birthday);
        assert.notEqual('0648941022', otherUser.phone);
        assert.notEqual('TestPassword!', otherUser.password);
    });

    it('Testing that models are not the same', async () => {
        assert.notEqual(user, otherUser)
    });
});