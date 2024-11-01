import { Router } from "express";
import { ROLES } from "../../constant.js";
import { auth } from "../../middleWare/auth.js";
import { addSupportPlan} from "./shared.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";

const router = Router();

router.use(asyncHandler(auth([ROLES.advisor,ROLES.coach])))
router.post('/add-support-plan',asyncHandler(addSupportPlan));

export default router;