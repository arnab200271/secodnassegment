const express = require('express')
const router = express.Router()
const multerupload = require('../utils/multer.config')
const ProductController = require('../controller/Product.controller')
//manage 
router.get('/', ProductController.homePage);
//post product
router.post("/admin/products/add",multerupload.single('image'),ProductController.createProduct)
router.get('/product/page',ProductController.productpage);
router.get('/product/manage',ProductController.manageproduct);
module.exports = router