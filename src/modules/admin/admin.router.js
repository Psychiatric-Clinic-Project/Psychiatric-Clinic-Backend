import { Router } from "express";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import {
  addArticle,
  adminSignUp,
  deleteArticle,
  getArticleById,
  getArticles,
} from "./admin.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
const router = Router();

router.post(
  "/signup",
  myMulter(multerValidation.image).single("image"),
  HME,
  asyncHandler(adminSignUp)
);
router.post(
  "/add/article",
  myMulter(multerValidation.image).single("image"),
  HME,
  asyncHandler(addArticle)
);
router.get("/allArticles", asyncHandler(getArticles));
router.delete("/deleteArticle/:id", asyncHandler(deleteArticle));
router.get("/article/:id", asyncHandler(getArticleById));

export default router;
