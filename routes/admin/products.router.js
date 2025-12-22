const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/admin/products.controller');
const multer = require("multer");
//const storageMulter = require('../../helpers/storgeMulter');
const upload = multer(/*{ storage: storageMulter() }*/);
const productsValidate = require('../../validates/admin/products/products.validate');
const uploadMiddleware = require('../../middlewares/admin/upload.middleware');



router.get('/', productsController.products);
router.patch("/update-status/:status/:id", productsController.updateStatus); 
router.delete("/delete/:id", productsController.deleteProduct); 
router.patch("/change-multi", productsController.updateMultiStatus);
router.get("/create", productsController.createproducts);
router.post("/create",
    upload.single("thumbnail"), 
    uploadMiddleware.upload,
    productsValidate.createPost,
    productsController.createProducts
);
router.get("/edit/:id", productsController.edit);
router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    uploadMiddleware.upload,
    productsValidate.createPost,
    productsController.editProducts
);
router.get("/detail/:id", productsController.detail);

module.exports = router;