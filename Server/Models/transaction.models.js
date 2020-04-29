class Transaction {
    constructor(id, name, amount, date) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.date = new Date()
    }
}

module.exports = Balance;