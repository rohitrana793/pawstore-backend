import express from "express";
import { adminOnly, userCheck } from "../middleware/authCheck.js";
import {
  blogValidation,
  productValidation,
  validate,
} from "../utils/validate.js";
import upload from "../middleware/upload.js";
import {
  createBlog,
  getBlogById,
  getBlogs,
  removeBlog,
  updateBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router
  .route("/")
  .get(getBlogs)
  .post(
    userCheck,
    adminOnly,
    upload.single("image"),
    validate.body(blogValidation),
    createBlog
  );
router
  .route("/:id")
  .get(getBlogById)
  .put(userCheck, adminOnly, upload.single("image"), updateBlog)
  .delete(userCheck, adminOnly, removeBlog);
export default router;
