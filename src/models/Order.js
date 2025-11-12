import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAmt: {
      type: Number,
      required: true,
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      // default: "cod",
      default: "online",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      // default: "pending",
      default: "paid",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    shippingAddress: {
      fullName: { type: String },
      phone: { type: String },
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
