import express from 'express';
import asyncHandler from "express-async-handler";
import Product from '../Models/BookModel.js';
import { staff,admin, protect } from "./../Middleware/AuthMiddleware.js";
const productRoute=express.Router();
// GET ALL PRODUCT
productRoute.get(
    "/",
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
            const review={
                name:req.user.name,
                comment,
                user:req.user._id,
            };
            product.reviews.push(review);
            await product.save();
            res.json(product);
        }
        else{
            res.status(404);
            throw new Error("Product not Found");
        }
        
    })
);
//Fetch all review
productRoute.get(
    "/:id/review",
    protect,
    asyncHandler(async (req,res)=>{
        const product =await Product.findById(req.params.id);
        if (product){
                res.json(product.reviews);
        }
        else{
            res.status(404);
            throw new Error("Product not Found")
        }
    }
    )
)
// DELETE REVIEW
productRoute.delete(
"/:id/review/:revid",
protect,
asyncHandler(async (req, res) => {
    const review = await Product.reviews.findById(req.params.reviews.revid)
    if (review) {
        if (review.user === req.user){
            await review.remove();
            res.json({ message: "review deleted" });
        }
        else{
            res.status(403);
            throw new Error("not authorized")
        }
   
    } else {
    res.status(404);
    throw new Error("review not Found");
    }
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
      const { title, author, description, image, countInStock,bookcode,forstaffonly} = req.body;
      const product = await Product.findById(req.params.id);
      if (product) {

        product.title = title || product.title;
        product.author = author || product.author;
        product.description = description || product.description;
        product.image = image || product.image;
        product.countInStock = countInStock || product.countInStock;
        product.bookcode=bookcode || product.bookcode;
        product.forstaffonly=forstaffonly || forstaffonly;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    })
  );

export default productRoute;