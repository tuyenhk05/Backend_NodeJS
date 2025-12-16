const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/admin/products.controller');
const multer = require("multer");
const storageMulter = require('../../helpers/storgeMulter');
const upload = multer({ storage: storageMulter() });

router.get('/', productsController.products);
router.patch("/update-status/:status/:id", productsController.updateStatus); 
router.delete("/delete/:id", productsController.deleteProduct); 
router.patch("/change-multi", productsController.updateMultiStatus);
router.get("/create", productsController.createproducts);
router.post("/create",
    upload.single("thumbnail"), 
    productsController.createProducts
);
module.exports = router;