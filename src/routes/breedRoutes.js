import express from "express";
import {
  createBreed,
  getBreedDetails,
  getSingleBreedDetail,
  removeBreed,
  updateBreed,
} from "../controllers/breedContoller.js";

import { breedValidation, validate } from "../utils/validate.js";
import { adminOnly, userCheck } from "../middleware/authCheck.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router
  .route("/")
  .get(getBreedDetails)
  .post(
    userCheck,
    adminOnly,
    upload.single("image"),
    validate.body(breedValidation),
    createBreed
  );
router
  .route("/:id")
  .get(getSingleBreedDetail)
  .put(userCheck, adminOnly, upload.single("image"), updateBreed)
  .delete(userCheck, adminOnly, removeBreed);

export default router;
