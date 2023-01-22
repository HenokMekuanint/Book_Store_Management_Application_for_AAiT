import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        title: { type: String, required: true },
        author: { type: String, required: true },
        description:{type:String,require:true},
        bookcode:{type:String,required:true},
        book: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "book",
        },
        
      },
    ],
    id_no: 
    { 
      type: String, 
      required: true
     },
     department:
    { 
      type: String, 
      required: true 

    },
    faculty:
    {
      type:String,
      require:true
    },
    signiture:
    {type:String,
      required:true}
      ,
    takeDate:{
        type:Date,
    },
    returnDate:{
        type:Date,
    }

  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;