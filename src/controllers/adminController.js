import { Blog } from "../models/Blog.js";
import { Breed } from "../models/Breed.js";
import { Contact } from "../models/Contact.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { Subscriber } from "../models/Subscriber.js";

export const breedDashboard = async (req, res) => {
  try {
    const totalBreed = await Breed.countDocuments();
    return res.status(200).json({ success: true, data: totalBreed });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const productDashboard = async (req, res) => {
  try {
    const totalProduct = await Product.countDocuments();
    return res.status(200).json({ success: true, data: totalProduct });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const blogDashboard = async (req, res) => {
  try {
    const totalBlog = await Blog.countDocuments();
    return res.status(200).json({ success: true, data: totalBlog });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const orderDashboard = async (req, res) => {
  try {
    const totalOrder = await Order.countDocuments();
    return res.status(200).json({ success: true, data: totalOrder });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const subscriberDashboard = async (req, res) => {
  try {
    const totalSubscriber = await Subscriber.countDocuments();
    return res.status(200).json({ success: true, data: totalSubscriber });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const contactDashboard = async (req, res) => {
  try {
    const totalContact = await Contact.countDocuments();
    return res.status(200).json({ success: true, data: totalContact });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
