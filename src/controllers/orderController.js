import mongoose from "mongoose";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import crypto from "crypto";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: "Invalid id" });

    const order = await Order.findById(id);

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getOrderByUser = async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    if (!userOrders.length) {
      return res
        .status(200)
        .json({ success: true, data: [], message: "No orders found" });
    }

    return res.status(200).json({ success: true, data: userOrders });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { totalAmt, products } = req.body;

    await Order.create({
      userId: req.userId,
      totalAmt,
      products,
    });

    await Promise.all(
      products.map(async (product) => {
        const prod = await Product.findById(product.productId);
        if (prod) {
          prod.stock = prod.stock - product.qty;
          await prod.save();
        }
      })
    );

    return res
      .status(201)
      .json({ success: true, message: "Order created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// esewa signature generation

export const generateSignature = async (req, res) => {
  try {
    const { total_amount, transaction_uuid, product_code } = req.body;

    // Correct string format as per eSewa docs
    const dataToSign = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

    const secretKey = process.env.ESEWA_SECRET_KEY;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(dataToSign)
      .digest("base64");

    res.json({ signature });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to generate signature", error: err.message });
  }
};
