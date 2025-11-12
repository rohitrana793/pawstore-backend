import mongoose from "mongoose";
import { categories, Product } from "../models/Product.js";

export const getProducts = async (req, res) => {
  const queryObject = { ...req.query };

  const excludedFields = ["search", "sort", "page", "fields", "limit", "skip"];

  excludedFields.forEach((feild) => {
    delete queryObject[feild];
  });

  try {
    // search
    if (req.query.search) {
      const searchText = req.query.search;
      if (categories.includes(searchText)) {
        queryObject.category = { $regex: searchText, $options: "i" };
      } else {
        queryObject.name = { $regex: searchText, $options: "i" };
      }
    }

    //eq|gt|gte
    const output = Object.entries(queryObject).reduce((acc, [key, value]) => {
      const match = key.match(/(.*?)\[(.*?)\]/);
      if (match) {
        const field = match[1];
        const operator = `$${match[2]}`;
        const parsedValue = isNaN(value) ? value : Number(value);

        acc[field] = { [operator]: parsedValue };
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    const query = Product.find(output);

    //sort
    if (req.query.sort) {
      const sorting = req.query.sort
        .split(/[\s,]+/)
        .filter(Boolean)
        .join(" ");
      query.sort(sorting);
    }

    //selects
    if (req.query.fields) {
      const fields = req.query.fields
        .split(/[\s,]+/)
        .filter(Boolean)
        .join(" ");
      query.select(fields);
    }

    //pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * 10;

    const total = await Product.countDocuments();
    const products = await query.skip(skip).limit(limit);

    return res.status(200).json({
      success: true,
      data: products,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: "Invalid id" });

    const product = await Product.findById(id).populate({
      path: "reviews",
      populate: {
        path: "userId",
        select: "name email",
      },
    });

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    return res.status(200).json({ success: true, data: product });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock } = req.body;

    if (!name || !description || !category || !price || !stock)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const imagePath = req?.file?.path;

    if (!imagePath)
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });

    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
      image: imagePath,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: "Invalid id" });

    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    if (req.file) {
      product.image = req.file.path;
    }

    product.name = req?.body?.name || product.name;
    product.description = req?.body?.description || product.description;
    product.category = req?.body?.category || product.category;
    product.price = req?.body?.price || product.price;
    product.stock = req?.body?.stock || product.stock;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: "Invalid id" });

    const deleteproduct = await Product.findByIdAndDelete(id);
    if (!deleteproduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: "Invalid id" });

    const product = await Product.findById(id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    product.reviews.push({
      userId: req.userId,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    const avg =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    product.rating = avg;

    product.save();

    return res
      .status(200)
      .json({ success: true, message: "Review added successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
