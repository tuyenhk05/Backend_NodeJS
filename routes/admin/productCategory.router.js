const express = require('express');
const router = express.Router();
const productsCategoryController = require('../../controllers/admin/products-category.controller');
const multer = require("multer");
const upload = multer(/*{ storage: storageMulter() }*/);

//const upload = multer(/*{ storage: storageMulter() }*/);
//const productsValidate = require('../../validates/admin/products/products.validate');
const uploadMiddleware = require('../../middlewares/admin/upload.middleware');



router.get('/', productsCategoryController.productsCategoryController);
router.get('/create', productsCategoryController.createProductsCategoryController); 
router.post(
    '/create',
    upload.single("thumbnail"),
    uploadMiddleware.upload,
    productsCategoryController.createProductsCategoryPostController);


module.exports = router;