import { Router } from "express";
import { multerValidation, myMulter } from "../../services/multer.js";
import { adminSignUp } from "./admin.controller.js";

const router = Router();

router.post("/signup",myMulter(multerValidation.image).single("image"),adminSignUp)

export default router;