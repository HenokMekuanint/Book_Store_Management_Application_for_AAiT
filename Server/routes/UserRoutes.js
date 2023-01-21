import express from 'express';
import asyncHandler from "express-async-handler";
import protect from '../Middleware/AuthMiddleware.js';
import User from '../Models/UserModel.js';
import generateToken from '../utils/generateToken.js';

const userRoute=express.Router();
console.log("sdf");
// LOGIN
userRoute.post(
    "/login",
    asyncHandler(async (req,res)=>{
        const {email,password} =req.body;
        const user =await User.findOne({ email });
        if (user && (await user.matchPasswords(password))) {
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                isStaff:user.isStaff,
                token:generateToken(user._id),
                createdAt:user.createdAt,

            })
            
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
            
        }
    })
);

userRoute.post(
    "/",
    asyncHandler(async (req,res) => {
        
        const { name,email,password} =req.body;
        const userExists = await User.findOne({ email })
        if ( userExists ) {
            res.status(400)
            throw new Error("User already exists")
        }
const user =await User.create({
            name,
            email,
            password
            });
if (user) {
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        isStaff:user.isStaff,
        token:generateToken(user._id),
    })
}
else{
    res.status(400);
    throw new Error ("Invalid User Data")
}
    })
);

userRoute.get(
    "/profile",
    protect,
    asyncHandler(async (req,res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                isStaff:user.isStaff,
                createdAt:user.createdAt, 
                              
            })
        } else {
            res.status(401);
            throw new Error("User  not found");
        }
    })
);

export default userRoute;