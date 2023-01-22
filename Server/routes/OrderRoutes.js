import express from 'express';
import asyncHandler from "express-async-handler";
import Order from '../models/OrderModel.js';
import {admin, protect} from "../Middleware/AuthMiddleware.js"
const orderRouter=express.Router();
// ORDER ROUTES
orderRouter.post(
    "/:id",
    protect,
    asyncHandler(async (req,res)=>{
        const { id_no,
            department,
            faculty,
            signiture,
            takedate,
            returndate
          }=req.body;
                const order = new Order({
            user:req.user._id,
            book:req.params.id,
            id_no:id_no,
            department:department,
            faculty:faculty,
            signiture:signiture,
            takedate:takedate,
            returndate:returndate,
                })
            const createOrder = await order.save();
            res.status(201).json(createOrder);
            }
    )


);


// GET ORDER BY ID
orderRouter.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders=await Order.find({});
    if (orders){

      res.status(200).json(orders)
    }
    else{
      res.status(400)
      throw new Error("Order Not Found")
    }
    
  })
);

export default orderRouter;