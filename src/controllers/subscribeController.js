import { Subscriber } from "../models/Subscriber.js";

export const getSubscriber = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({});

    if (subscribers.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "No subscribers found" });

    return res.status(200).json({ success: true, data: subscribers });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await Subscriber.findOne({ email });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Already subscribed" });

    await Subscriber.create({ email });
    return res.status(201).json({
      success: true,
      message: "User subscribed successfully",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
