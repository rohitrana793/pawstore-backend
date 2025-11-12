import express from "express";
import { createContact, getContact } from "../controllers/contactController.js";
import { contactValidation, validate } from "../utils/validate.js";

const router = express.Router();

router
  .route("/")
  .get(getContact)
  .post(validate.body(contactValidation), createContact);

export default router;
