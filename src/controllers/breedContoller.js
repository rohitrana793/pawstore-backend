import mongoose from "mongoose";
import { Breed } from "../models/Breed.js";

export const getBreedDetails = async (req, res) => {
  try {
    const breeds = await Breed.find({});
    return res.status(200).json({ success: true, data: breeds });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getSingleBreedDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Id" });

    const breed = await Breed.findById(id);
    if (!breed)
      return res
        .status(404)
        .json({ success: false, message: "Breed not found" });

    return res.status(200).json({ success: true, data: breed });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createBreed = async (req, res) => {
  try {
    const { name, lifeSpan, description, origin, price } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const imagePath = req.file.path;

    await Breed.create({
      name,
      lifeSpan,
      description,
      origin,
      price,
      image: imagePath,
    });
    return res
      .status(200)
      .json({ success: true, message: "breed created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateBreed = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedBreed = await Breed.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedBreed)
      return res.status(404).json({ message: "Breed not found" });

    return res
      .status(200)
      .json({ success: true, message: "Breed updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const removeBreed = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Id" });

    const breed = await Breed.findById(id);
    if (!breed) return res.status(404).json({ message: "Breed not found" });

    await Breed.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Breed remove successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
