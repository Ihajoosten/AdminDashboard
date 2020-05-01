class Invoice {
    constructor(id, purchaseDate, company, productsArray, discount, totalPrice) {
        this.id = id;
        this.purchaseDate = purchaseDate;
        this.company = company;
        this.productsArray = productsArray;
        this.discount = discount;
        this.totalPrice = totalPrice;
    }
}

module.exports = Invoice;