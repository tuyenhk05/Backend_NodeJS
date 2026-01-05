const dashboardRouter = require('./dashboard.router');
const systemconfig = require('../../config/system');
const productsRouter = require('./products.router');
const productCategoryRouter = require('./productCategory.router');
module.exports = (app) => {
    const PATH = systemconfig.preficxAdmin;
    app.use(PATH + "/products", productsRouter);
    app.use(PATH + "/dashboard", dashboardRouter);
    app.use(PATH + "/product-category", productCategoryRouter);
};
