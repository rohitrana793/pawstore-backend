import express from "express";
import {
  loginUser,
  logout,
  registerUser,
} from "../controllers/userController.js";
import {
  loginValidation,
  registerValidation,
  validate,
} from "../utils/validate.js";
import { userCheck } from "../middleware/authCheck.js";

const router = express.Router();

router.route("/register").post(validate.body(registerValidation), registerUser);
router.route("/login").post(validate.body(loginValidation), loginUser);
router.route("/logout").post(userCheck, logout);

export default router;
