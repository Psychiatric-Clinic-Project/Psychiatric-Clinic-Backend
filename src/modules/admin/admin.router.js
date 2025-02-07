import { Router } from "express";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import {
  addArticle,
  adminSignUp,
  deleteAdvisor,
  deleteArticle,
  getArticles,
  deleteUser,
  getArticleById,
  getUsers,
  updateUser,
  getAdvisors,
  updateAdvisor,
  responseSupport,
  getSupportRequest,
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
router.put('/update-user/:id',asyncHandler(updateUser))
router.get('/get-users',asyncHandler(getUsers))
router.delete('/delete-user/:id',asyncHandler(deleteUser))
router.put('/response-support/:id',asyncHandler(responseSupport))
router.get('/support-request',asyncHandler(getSupportRequest))
router.put('/update-advisor/:id',asyncHandler(updateAdvisor))
router.get('/get-advisors',asyncHandler(getAdvisors))
router.delete('/delete-advisor/:id',asyncHandler(deleteAdvisor))

export default router;
