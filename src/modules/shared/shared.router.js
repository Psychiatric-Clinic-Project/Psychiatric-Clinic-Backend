import { Router } from "express";
import { ROLES } from "../../constant.js";
import { auth } from "../../middleWare/auth.js";
import { addStatusReport, addSupportPlan, deleteSupportPlan, getStatusReport, getSupportPlanById, getSupportPlans, updateSupportPlan} from "./shared.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";

const router = Router();
router.get('/status-report',asyncHandler(auth([ROLES.advisor, ROLES.coach, ROLES.user])),asyncHandler(getStatusReport))
router.use(asyncHandler(auth([ROLES.advisor,ROLES.coach])))
router.post('/support-plan',asyncHandler(addSupportPlan));
router.get('/support-plan/:id',asyncHandler(getSupportPlanById));
router.get("/support-plans",asyncHandler(getSupportPlans))
router.put('/support-plan/:id',asyncHandler(updateSupportPlan));
router.delete("/support-plan/:id",asyncHandler(deleteSupportPlan))
router.post("/status-report/:id",asyncHandler(addStatusReport))

export default router;