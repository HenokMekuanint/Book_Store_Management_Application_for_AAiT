import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    book: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "book",
        },
          
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


    takedate:{
        type:String,
        required:true
    },
    returndate:{
        type:String,
        required:true
    },
    isreturned:{
      type:Boolean,
      default:false,
    }

  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;