

const Product = require("../../models/products.model");
const filterStatus = require('../../helpers/filterStatus');
const search = require('../../helpers/search');
const panigation = require('../../helpers/pagination');
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




    const products = await Product.find(find).limit(Pagination.limitItem).skip(Pagination.skip);

    res.render('admin/pages/products/index', {
        pageTitle: 'Product Management',
        products: products,
        listStatus: listStatus,
        searchQuery: keyword || '',
        totalPages: Pagination.totalPages,
        currentPage: page
    });
};
module.exports.updateStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const id = req.params.id;
        // Vận công cập nhật dữ liệu
        await Product.updateOne({ _id: id }, { status: status });

        // Tùy chọn: Thêm thông báo Flash (nếu Huynh đã cài thư viện flash)
        // req.flash('success', 'Cập nhật trạng thái thành công!');

        // Chiêu thức "Hồi mã thương": Quay về chỗ cũ
        res.redirect(req.get('referer'));

    } catch (error) {
        console.log("Tẩu hỏa nhập ma khi cập nhật:", error);
        // Nếu lỗi ID sai định dạng, redirect về trang danh sách cho an toàn
        res.redirect("/admin/products");
    }
};
