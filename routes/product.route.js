const express=require("express");
const router= express.Router();
const Product = require('../models/product.model.js');
const {getProducts,getProduct,postProduct,updateProduct,deleteProduct} = require('../controllers/product.controller.js');

router.get('/' ,getProducts);

router.get('/:id',getProduct);

router.post('/', postProduct);

router.put('/:id', updateProduct)

router.put('/:id', deleteProduct)



module.exports= router;