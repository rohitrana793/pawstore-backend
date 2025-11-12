import mongoose from "mongoose";
import { Blog } from "../models/Blog.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    return res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: "Invalid id" });

    const blog = await Blog.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    return res.status(200).json({ success: true, data: blog });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author } = req.body;

    if (!title || !excerpt || !content || !author)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    if (!req.file || !req.file.path)
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });

    const imagePath = req.file.path;

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      author,
      image: imagePath,
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: "Invalid id" });

    const blog = await Blog.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    if (req.file) {
      blog.image = req.file.path;
    }

    blog.title = req?.body?.title || blog.title;
    blog.excerpt = req?.body?.excerpt || blog.excerpt;
    blog.content = req?.body?.content || blog.content;
    blog.author = req?.body?.author || blog.author;

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const removeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: "Invalid id" });

    const deleteBlog = await Blog.findByIdAndDelete(id);
    if (!deleteBlog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    return res.status(200).json({
      success: true,
      message: "Blog removed successfully",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
