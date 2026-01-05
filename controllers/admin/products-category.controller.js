const productCategoryModel = require('../../models/products-category.model');
const systemConfig = require('../../config/system');
const createTreeHelper = require("../../helpers/createTree");
//[GET] /admin/products-category
module.exports.productsCategoryController = async (req, res) => {
    try {
        let find = {
            deleted: false
        };
        const productCategories = await productCategoryModel.find(find);
        const newProductCategories = createTreeHelper(productCategories);
        res.render('admin/pages/products-category/index', {
            pageTitle: 'Product Category Management',
            records: newProductCategories
        });

    }
    catch (error) {
        console.error('Error rendering product category page:', error);
        res.status(500).send('Internal Server Error');
    }
}
//[GET] /admin/products-category/create
module.exports.createProductsCategoryController = async (req, res) => {
    try {
        let find = {
            deleted: false,
        };
        const records = await productCategoryModel.find(find);
        console.log("Records fetched from DB:", records);
        const newRecords = createTreeHelper(records);
        console.log("New Records with Tree Structure:", newRecords);
        res.render('admin/pages/products-category/create', {
            pageTitle: 'Create Product Category',
            records: newRecords
        });
    } catch (error) {
        console.error('Error rendering create product category page:', error);
        res.status(500).send('Internal Server Error');
    }
}
//[POST] /admin/products-category/create 
module.exports.createProductsCategoryPostController = async (req, res) => {
    try {
        console.log("Body nhận được:", req.body);
        if (req.body.position) {
            req.body.position = parseInt(req.body.position);
        }
        else {
            req.body.position = await productCategoryModel.countDocuments() + 1;
        }
        //req.body.thumbnail = req.file ? `/uploads/${req.file.filename}` : '';
        const newProduct = new productCategoryModel(req.body);
        await newProduct.save();
        res.redirect(`${systemConfig.preficxAdmin}/product-category`);
    } catch (error) {
        console.log("Tẩu hỏa nhập ma khi tạo sản phẩm:", error);
        res.redirect(`${systemConfig.preficxAdmin}/product-category`);
    }
}