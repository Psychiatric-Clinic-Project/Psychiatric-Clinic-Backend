import { Router } from "express";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import { addArticle, adminSignUp, deleteArticle, getArticle, getArticleById } from "./admin.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";

const router = Router();

router.post("/signup",myMulter(multerValidation.image).single("image"),HME,asyncHandler(adminSignUp))
router.post("/add/article",myMulter(multerValidation.image).single("image"),HME,asyncHandler(addArticle))
router.get("/allArticles",getArticle);
router.delete("/deleteArticle/:id",asyncHandler(deleteArticle))
router.get("/article/:id", asyncHandler(getArticleById));

export default router;