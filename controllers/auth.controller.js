const express= require('express')
const jwt= require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const userModel= require('../models/user.model.js')
const asyncHandler= require('express-async-handler');
const {v4 : uuidv4}= require('uuid');  //import UUID for unique ID generation

const register= asyncHandler(async(req,res)=>{
    const {fullName, email, password, phoneNumber} = req.body;

    const verifyEmail= await userModel.findOne({email: email})
    try {
        if(verifyEmail){
            return res.status(403).json({
                message:"Email is already used"
            })
        }else{
            const userId= uuidv4();
            bcrypt.hash(req.body.password,10).then((hash)=>{
                const user= new userModel({
                    userId: userId,
                    fullName: fullName,
                    email: email,
                    password: hash,
                    phoneNumber: phoneNumber
                });

                user.save().then((response) =>{
                    return res.status(201).json({
                        message: "User created successfully",
                        result: response,
                        success: true 
                    })
                }).catch((err) => {
                    res.status(500).json({
                        error: err,
                    })
                })
            })
        }
    } catch (err) {
        return res.status(412).send({
            success:false,
            message: err.message
        })
    }
});

const login= asyncHandler(async(req,res)=>{
    const {email, password}= req.body;

    let getUser

    userModel.findOne({
        email:email
    }).then((user)=> {
        if(!user){
            return res.status(401).json({
                message:"Authentication Failed",
            })
        }
        getUser=user;
        return bcrypt.compare(password, user.password);
    }).then((response) =>{
        if(!response){
            return res.status(401).json({
                message:"Authentication Failed",
            })
        }else{
            let jwtToken= jwt.sign(
            {
                email:getUser.email,
                userId: getUser.userId
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
            )
            return res.status(200).json({
                accessToken:jwtToken,
                userId : getUser.userId,
            })
        }
    }).catch((err) =>{
        return res.status(401).json({
            message:err.message,
            success:false
        })
    })

});

const userProfile = asyncHandler(async(req,res,next) => {
    const {id}= req.params;
    try {
        const verifyUser= await userModel.findOne({userId:id});
        if(!verifyUser){
            return res.status(403).json({
                message : "User not Found",
                success: false,
            })
        }else{
            return res.status(200).json({
                message: `user ${verifyUser.fullName} found`,
                success: true,
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message:error.message,
        })
        
    }
});

const users= asyncHandler(async(req,res)=>{
    try {
        const users= await userModel.find();
        console.log(users);
        return res.status(200).json({
            data:users,
            success:true,
            message:"Users List Created"
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message:error.message,
        })
        
    }
});

module.exports={
    register,
    login,
    userProfile,
    users
};
