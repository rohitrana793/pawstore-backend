import express from "express";
import {
  blogDashboard,
  breedDashboard,
  contactDashboard,
  orderDashboard,
  productDashboard,
  subscriberDashboard,
} from "../controllers/adminController.js";
import { adminOnly, userCheck } from "../middleware/authCheck.js";

const router = express.Router();

router.route("/breed").get(userCheck, adminOnly, breedDashboard);
router.route("/product").get(userCheck, adminOnly, productDashboard);
router.route("/blog").get(userCheck, adminOnly, blogDashboard);
router.route("/order").get(userCheck, adminOnly, orderDashboard);
router.route("/subscriber").get(userCheck, adminOnly, subscriberDashboard);
router.route("/contact").get(userCheck, adminOnly, contactDashboard);

export default router;
