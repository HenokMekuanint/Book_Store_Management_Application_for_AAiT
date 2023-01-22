import express from 'express';
import asyncHandler from "express-async-handler";
import Order from '../models/OrderModel.js';
import {protect} from "../Middleware/AuthMiddleware.js"
const orderRouter=express.Router();
// ORDER ROUTES
orderRouter.post(
    "/",
    protect,
    asyncHandler(async (req,res)=>{
        const { id_no,
            department,
            faculty,
            signiture,
            takedate,
            returndate}=req.body;
            if (orderItems && orderItems.length===0) {
                res.status(400)
                throw new Error("No order items")
                return
            } else {
                const order = new Order({
            orderItems,
            user:req.user._id,
            id_no,
            department,
            faculty,
            signiture,
            takedate,
            returndate,
                })
            const createOrder = await order.save();
            res.status(201).json(createOrder);
            }
    }
    )


);


// GET ORDER BY ID
orderRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);


// USER LOGIN ORDERS
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({user: req.user._id}).sort({_id:-1});
    res.json(order);
  })
);


export default orderRouter;