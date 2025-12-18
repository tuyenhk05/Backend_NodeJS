
const systemConfig = require('../../config/system');
const Product = require("../../models/products.model");
const filterStatus = require('../../helpers/filterStatus');
const search = require('../../helpers/search');
const panigation = require('../../helpers/pagination');
//[GET] /admin/products
module.exports.products = async (req, res) => {
    const status = req.query.status;
    const keyword = req.query.keyword;
    const page = parseInt(req.query.page) || 1;

    let find = {
        deleted: false
    };
    // Filter by status
    if (status) {
        find.status = status;
    }
    // Set pagination options
    const listStatus = filterStatus(status);
    search(find, keyword);

    //Pagination

    const countProducts = await Product.countDocuments(find);
    let Pagination = panigation(countProducts, page, 4);




    const products = await Product
        .find(find)
        .limit(Pagination.limitItem)
        .skip(Pagination.skip)
        .sort({ position: "desc" });

    res.render('admin/pages/products/index', {
        pageTitle: 'Product Management',
        products: products,
        listStatus: listStatus,
        searchQuery: keyword || '',
        totalPages: Pagination.totalPages,
        currentPage: page
    });
};
//[PATCH] /admin/products/update-status/:status/:id
module.exports.updateStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const id = req.params.id;
        // Vận công cập nhật dữ liệu
        await Product.updateOne({ _id: id }, { status: status });

        res.redirect(req.get('referer'));

    } catch (error) {
        console.log("Tẩu hỏa nhập ma khi cập nhật:", error);
        // Nếu lỗi ID sai định dạng, redirect về trang danh sách cho an toàn
        res.redirect(`${systemConfig.preficxAdmin}/products`);
    }
};
//[DELETE] /admin/products/delete/:id]
module.exports.deleteProduct = async (req, res) => {
    try {
       
        const id = req.params.id;
        const dateNow = new Date();

        await Product.updateOne({ _id: id }, { deleted:true,deletedAt:dateNow });

        res.redirect(req.get('referer'));

    } catch (error) {
        console.log("Tẩu hỏa nhập ma khi cập nhật:", error);
        res.redirect(`${systemConfig.preficxAdmin}/products`);
    }
};
//[PATCH] /admin/products/update-multi-status
module.exports.updateMultiStatus = async (req, res) => {
    try {
        const status = req.body.type;
        const ids = req.body.ids; //mảng id
        const idsSelect = ids.split(",");
        
        switch (status) {
            case "active":
                await Product.updateMany({ _id: { $in: idsSelect } }, { status: "active" });
                break;
            case "inactive":
                await Product.updateMany({ _id: { $in: idsSelect } }, { status: "inactive" });
                break;
            case "delete-all":
                await Product.updateMany({ _id: { $in: idsSelect } }, { deleted: true });
                break;
            default:
                break;
        }

        res.redirect(req.get('referer'));
    } catch (error) {
        console.log("Tẩu hỏa nhập ma khi cập nhật:", error);
        res.redirect(`${systemConfig.preficxAdmin}/products`);
    }
};
//[POST] /admin/products/create
module.exports.createproducts = async (req, res) => {
    try {
        res.render('admin/pages/products/createProduct', {
            pageTitle: 'Create Product',
           
        });
    } catch (error) {
        console.log("Tẩu hỏa nhập ma khi tạo sản phẩm:", error);
        res.redirect(`${systemConfig.preficxAdmin}/products`);
    }
};
//[POST] /admin/products/create
module.exports.createProducts = async (req, res) => {
    try {
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        if (req.body.position) {
            req.body.position = parseInt(req.body.position);
        }
        else {
            req.body.position = await Product.countDocuments() + 1;
        }
        req.body.thumbnail = req.file ? `/uploads/${req.file.filename}` : '';
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect(`${systemConfig.preficxAdmin}/products`);
    } catch (error) {
        console.log("Tẩu hỏa nhập ma khi tạo sản phẩm:", error);
        res.redirect(`${systemConfig.preficxAdmin}/products`);
    }
};
//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const find = { _id: id, deleted: false };
        const product = await Product.findOne(find);
        if (product) {
            res.render('admin/pages/products/editProduct', {
                pageTitle: 'Edit Product',
                product: product
            });
        } else {
            res.redirect(`${systemConfig.preficxAdmin}/products`);
        }
    } catch (error) {
        console.log("Tẩu hỏa nhập ma khi tạo sản phẩm:", error);
        res.redirect(`${systemConfig.preficxAdmin}/products`);
    }
};
//[PATCH] /admin/products/edit/:id
module.exports.editProducts = async (req, res) => {
    try {
        const id = req.params.id;
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.position = parseInt(req.body.position);
        if (req.file) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }
        await Product.updateOne({_id: id},req.body );
        res.redirect(req.get('referer'));
        
    } catch (error) {
        console.log("Tẩu hỏa nhập ma khi tạo sản phẩm:", error);
        res.redirect(`${systemConfig.preficxAdmin}/products`);
    }
};

