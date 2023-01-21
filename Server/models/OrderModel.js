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
        author: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true},
        book: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "book",
        },
      },
    ],
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