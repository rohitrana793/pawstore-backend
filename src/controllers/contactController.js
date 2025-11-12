import { Contact } from "../models/Contact.js";

export const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    return res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await Contact.create({
      name,
      email,
      subject,
      message,
    });

    return res
      .status(201)
      .json({ success: true, message: "Contact created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
