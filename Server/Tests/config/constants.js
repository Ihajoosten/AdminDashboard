const requester = require('./testConfig');

module.exports = {
    createUserQuery: (hash) => {
        return (`INSERT INTO users VALUES ('247', 'FirstTestName', 'LastTestName', 'Test@gmail.com', '01-01-2020', '0615976428', '${hash}')`);
    },
    deleteUserQuery: () => {
        return ('DELETE FROM users');
    },
    createCompanyQuery: () => {
        return (`INSERT INTO companies VALUES ('247','Adidas', 'Sales', 'Breda', 'info@adidas.nl', '0647921547')`);
    },
    createProductQuery: () => {
        return (`INSERT INTO products VALUES ('247', 'Bluetooth mouse', 'Nice wireless mouse', '${24,9}', 'Logitech', '${Date.now.toString()}')`)
    },
    deleteProductQuery: () => {
        return ('DELETE FROM products');
    },
    loginUser: async (email, password) => {
        let user = { email: email, password: password }
        return await requester.post('/api/auth/login').send(user);
    }
}