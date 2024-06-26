const express=require("express");
const router= express.Router();
const Product = require('../models/product.model.js');
const {getProducts,getProduct,postProduct,updateProduct,deleteProduct} = require('../controllers/product.controller.js');
const verifyToken = require("../middleware/auth.middleware")

router.get('/' ,getProducts);

router.get('/:id',getProduct);

//router.post('/', postProduct);

//router.put('/:id', updateProduct)

//router.put('/:id', deleteProduct)

router.post("/", verifyToken, Product,postProduct);

router.put("/:id", verifyToken, Product,updateProduct);

router.delete("/:id",verifyToken,deleteProduct);




module.exports= router;