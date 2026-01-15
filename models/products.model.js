const mongoose = require('mongoose');


const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productschema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        product_category_id: {
            type: String,
            default: "" // Mặc định để trống nếu chưa chọn danh mục
        },
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
