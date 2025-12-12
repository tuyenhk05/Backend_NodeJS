
const mongoose = require('mongoose');
const productschema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        thumbnail: String,
        status: String,
        position: Number,
        deleted: Boolean
    }
);
const Products = mongoose.model('Products', productschema, "products");
module.exports = Products;
