class User {
    constructor(id, firstname, lastname, email, birthday, phone, password) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.birthday = birthday;
        this.phone = phone;
        this.password = password;
    }
}

module.exports = User;