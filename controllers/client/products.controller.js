const Products = require('../../models/products.model');
module.exports.index = async (req, res) => {
    const products = await Products.find({
        status: 'active',
        deleted: false
    });
    console.log(products);

    products.forEach((product) => {
        product.price = product.price - (product.price * product.discountPercentage / 100);
    });

    res.render('client/pages/products/index', {
        pageTitle: 'Products Page',
        products: products
    });
};
