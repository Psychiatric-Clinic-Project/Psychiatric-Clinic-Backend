import { Router } from "express";
import { ROLES } from "../../constant.js";
import { auth } from "../../middleWare/auth.js";
import { addSupportPlan, deleteSupportPlan, getSupportPlanById, getSupportPlans, updateSupportPlan} from "./shared.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";

const router = Router();

router.use(asyncHandler(auth([ROLES.advisor,ROLES.coach])))
router.post('/support-plan',asyncHandler(addSupportPlan));
router.get('/support-plan/:id',asyncHandler(getSupportPlanById));
router.get("/support-plans",asyncHandler(getSupportPlans))
router.put('/support-plan/:id',asyncHandler(updateSupportPlan));
router.delete("/support-plan/:id",asyncHandler(deleteSupportPlan))

export default router;