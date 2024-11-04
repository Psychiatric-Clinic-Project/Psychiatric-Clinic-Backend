import { Router } from "express";
import { ROLES } from "../../constant.js";
import { auth } from "../../middleWare/auth.js";
import { addSupportPlan, addTrainingReport, deleteSupportPlan, deleteTrainingReport, getSupportPlanById, getSupportPlans, getTrainingReport, updateSupportPlan, updateTrainingReport} from "./shared.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";

const router = Router();
router.get("/training-report",asyncHandler(auth([ROLES.advisor,ROLES.coach,ROLES.user])),asyncHandler(getTrainingReport))
router.use(asyncHandler(auth([ROLES.advisor,ROLES.coach])))
router.post('/support-plan',asyncHandler(addSupportPlan));
router.get('/support-plan/:id',asyncHandler(getSupportPlanById));
router.get("/support-plans",asyncHandler(getSupportPlans))
router.put('/support-plan/:id',asyncHandler(updateSupportPlan));
router.delete("/support-plan/:id",asyncHandler(deleteSupportPlan))
router.post ("/training-report/:id",asyncHandler(addTrainingReport))
router.put("/training-report/:id",asyncHandler(updateTrainingReport))
router.delete("/training-report/:id",asyncHandler(deleteTrainingReport))


export default router;