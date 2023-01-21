import express from 'express';
import asyncHandler from "express-async-handler";
import Order from "./../Models/OrderModels.js";
import protect from "../Middleware/AuthMiddleware.js"
const orderRouter=express.Router();
// ORDER ROUTES
orderRouter.post(
    "/",
    protect,
    asyncHandler(async (req,res)=>{
        const {
            orderItems, 
            takedate,
            returndate,
        }=req.body;
            if (orderItems && orderItems.length===0) {
                res.status(400)
                throw new Error("No order items")
                return
            } else {
                const order = new Order({
            orderItems,
            user:req.user._id,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
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



// ORDER IS PAID
orderRouter.put(
    "/:id/pay",
    protect,
    asyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id)
  
      if (order) {
        order.isPaid=true,
        order.paidAt=Date.now(),
        order.paymentResult={
           id:req.body.id,
           status:req.body.status,
           update_time:req.body.update_time,
           email_address:req.body.email_address,
        };
        const updateOrder = await order.save();
        res.json(updateOrder);
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