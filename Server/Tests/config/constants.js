module.exports = {
    createUserQuery: (hash) => {
        return (`INSERT INTO users VALUES ('247', 'FirstTestName', 'LastTestName', 'Test@gmail.com', '01-01-2020', '0615976428', '${hash}')`);
    },
    deleteUserQuery: () => {
        return ('DELETE FROM users');
    }
}