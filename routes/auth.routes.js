const express = require('express');
const router= express.Router();

const {registerValidation, loginValidation} =require('../middleware/authvalidation.middeware.js');

const {register, login,userProfile,users} = require('../controllers/auth.controller.js');

const verifyToken = require('../middleware/auth.middleware.js');

router.post("/register",registerValidation,register);

router.post("/login",loginValidation,login);

router.get("/profile/:id",verifyToken,userProfile);

router.get("/users",verifyToken,users);

module.exports = router;