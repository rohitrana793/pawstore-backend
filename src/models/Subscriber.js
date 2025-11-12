import mongoose from "mongoose";

export const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);
