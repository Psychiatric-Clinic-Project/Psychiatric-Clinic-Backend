import { Router } from "express";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import {
  addArticle,
  adminSignUp,
  deleteArticle,
  deleteCoach,
  getArticleById,
  getArticles,
  getCoaches,
  updateCoach,
} from "./admin.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { auth } from "../../middleWare/auth.js";
import { ROLES } from "../../constant.js";
const router = Router();

router.post(
  "/signup",
  myMulter(multerValidation.image).single("image"),
  HME,
  asyncHandler(adminSignUp)
);
router.use(auth([ROLES.admin]))
router.post(
  "/add/article",
  myMulter(multerValidation.image).single("image"),
  HME,
  asyncHandler(addArticle)
);
router.get("/allArticles", asyncHandler(getArticles));
router.delete("/deleteArticle/:id", asyncHandler(deleteArticle));
router.get("/article/:id", asyncHandler(getArticleById));
router.put('/update-coach/:id',asyncHandler(updateCoach))
router.get('/get-coaches',asyncHandler(getCoaches))
router.delete('/delete-coach/:id',asyncHandler(deleteCoach))

export default router;
