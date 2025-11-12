import express from "express";
import {
  addReview,
  createProduct,
  getProductById,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/productController.js";
import { adminOnly, userCheck } from "../middleware/authCheck.js";
import { productValidation, validate } from "../utils/validate.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    userCheck,
    adminOnly,
    upload.single("image"),
    validate.body(productValidation),
    createProduct
  );
router
  .route("/:id")
  .get(getProductById)
  .put(userCheck, adminOnly, upload.single("image"), updateProduct)
  .delete(userCheck, adminOnly, removeProduct);

router.route("/review/:id").post(userCheck, addReview);
export default router;
