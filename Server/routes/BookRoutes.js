import express from 'express';
import asyncHandler from "express-async-handler";
import Product from '../Models/BookModel.js';
import { admin, protect } from "./../Middleware/AuthMiddleware.js";
const productRoute=express.Router();
// GET ALL PRODUCT
productRoute.get(
    "/getall",
    asyncHandler(async (req,res)=>{
        const pageSize=6
        const page=Number(req.query.pageNumber) || 1 ;
        const keyword = req.query.keyword ? {
            name:{
                $regex:req.query.keyword,
                $options: "i",
            },
        }
        :{}
        const count =await Product.countDocuments({ ...keyword });
        const products =await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1)).sort({_id:-1});
        res.json({products , page , pages: Math.ceil(count / pageSize)}); 
    })
);
//GET SINGLE PRODUCT
productRoute.get(
    "/:id",
    asyncHandler(async (req,res)=>{
        const product =await Product.findById(req.params.id);
        if(product){
            res.json(product); 
        }
        else{
            res.status(404);
            throw new Error("Product not Found");
        }
        
    })
);


//PRODUCT REVIEW
productRoute.post(
    "/:id/review",
    protect,
    asyncHandler(async (req,res)=>{
        const {comment}=req.body
        const product =await Product.findById(req.params.id);
        if(product){
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString()=== req.user._id.toString()
            )
        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already Reviewed");
        }
        const review={
            name:req.user.name,
            comment,
            user:req.user._id,
        };
        product.reviews.push(review);

        
        }
        else{
            res.status(404);
            throw new Error("Product not Found");
        }
        
    })
);
// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRoute.get(
    "/all",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const products = await Product.find({}).sort({ _id: -1 });
      res.json(products);
    })
  );

  // DELETE PRODUCT
productRoute.delete(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        await product.remove();
        res.json({ message: "Product deleted" });
      } else {
        res.status(404);
        throw new Error("Product not Found");
      }
    })
  );
  
  // CREATE PRODUCT
productRoute.post(
"/",
protect,
admin,
asyncHandler(async (req, res) => {
    const { title, author, description, bookcode,image, countInStock,forstaffonly } = req.body;
    const productExist = await Product.findOne({ title });
    if (productExist) {
    res.status(400);
    throw new Error("Product name already exist");
    } else {
    const product = new Product({
        title,
        author,
        description,
        image,
        countInStock,
        bookcode,
        forstaffonly,
        user: req.user._id,
    });
    if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
    } else {
        res.status(400);
        throw new Error("Invalid product data");
    }
    }
})
);
  
  // UPDATE PRODUCT
productRoute.put(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const { name, author, description, image, countInStock,bookcode,forstaffonlyl, } = req.body;
      const product = await Product.findById(req.params.id);
      if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.countInStock = countInStock || product.countInStock;
  
        const updatedProduct = await product.save();
        res.json(updatedProduct);
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    })
  );

export default productRoute;