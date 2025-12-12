const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/admin/products.controller');
router.get('/', productsController.products);
router.patch("/update-status/:status/:id", productsController.updateStatus); 
module.exports = router;