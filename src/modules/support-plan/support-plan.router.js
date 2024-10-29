import { Router } from "express";
import { ROLES } from "../../constant.js";
import { auth } from "../../middleWare/auth.js";
import { addSupportPlan} from "./support-plan.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";



const router = Router();
router.use(auth([ROLES.advisor,ROLES.coach]))


router.post('/add',asyncHandler(addSupportPlan));


export default router;