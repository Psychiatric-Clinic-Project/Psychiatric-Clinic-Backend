import { Router } from "express";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import { adminSignUp } from "./admin.controller.js";

const router = Router();

router.post("/signup",myMulter(multerValidation.image).single("image"),HME,adminSignUp)

export default router;