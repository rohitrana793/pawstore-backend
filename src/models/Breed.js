import mongoose from "mongoose";

const breedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    lifeSpan: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timeseries: true,
  }
);

export const Breed = mongoose.model("Breed", breedSchema);
