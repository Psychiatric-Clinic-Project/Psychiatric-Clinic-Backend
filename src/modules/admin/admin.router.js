import { Router } from "express";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import { addArticle, adminLogin, adminSignUp, deleteArticle, getArticle, getArticleById } from "./admin.controller.js";

const router = Router();

router.post("/signup",myMulter(multerValidation.image).single("image"),HME,adminSignUp)
router.post("/signin",adminLogin)
router.post("/add/article",myMulter(multerValidation.image).single("image"),HME,addArticle)
router.get("/allArticles",getArticle);
router.delete("/deleteArticle/:id",deleteArticle)
router.get("/article/:id", getArticleById);




export default router;