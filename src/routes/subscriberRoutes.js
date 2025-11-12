import express from "express";

import { adminOnly, userCheck } from "../middleware/authCheck.js";
import { subscriberValidation, validate } from "../utils/validate.js";
import {
  addSubscriber,
  getSubscriber,
} from "../controllers/subscribeController.js";

const router = express.Router();

router
  .route("/")
  .get(userCheck, adminOnly, getSubscriber)
  .post(validate.body(subscriberValidation), addSubscriber);

export default router;
