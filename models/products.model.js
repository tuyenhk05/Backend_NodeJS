const mongoose = require('mongoose');


const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productschema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        thumbnail: String,
        status: String,
        position: Number,
        slug: {
            type: String,
            unique: true,
            slug: "title"
        },
        deleted:
        {
            type: Boolean, default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
);
const Products = mongoose.model('Products', productschema, "products");
module.exports = Products;
