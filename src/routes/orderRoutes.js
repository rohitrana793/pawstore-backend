import express from "express";
import {
  createOrder,
  generateSignature,
  getOrderById,
  getOrderByUser,
  getOrders,
} from "../controllers/orderController.js";
import { adminOnly, userCheck } from "../middleware/authCheck.js";

const router = express.Router();

router
  .route("/")
  .get(userCheck, adminOnly, getOrders)
  .post(userCheck, createOrder);
router.route("/user").get(userCheck, getOrderByUser);
router.route("/:id").get(userCheck, getOrderById);

router.route("/generate-signature").post(userCheck, generateSignature);

export default router;
