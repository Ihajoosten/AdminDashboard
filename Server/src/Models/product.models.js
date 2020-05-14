class Product {
    constructor(id, name, description, price, companyId, dateReleased) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.companyId = companyId;
        this.dateReleased = dateReleased;
    }
}

module.exports = Product;