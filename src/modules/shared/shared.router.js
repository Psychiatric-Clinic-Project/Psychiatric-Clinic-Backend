import { Router } from "express";
import { ROLES } from "../../constant.js";
import { auth } from "../../middleWare/auth.js";
import { addSession, addSupportPlan, deleteSession, deleteSupportPlan, getSupportPlanById, getSupportPlans, updateSupportPlan} from "./shared.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { getSessions } from "../user/user.controller.js";

const router = Router();

router.use(asyncHandler(auth([ROLES.advisor,ROLES.coach])))
router.post('/support-plan',asyncHandler(addSupportPlan));
router.get('/support-plan/:id',asyncHandler(getSupportPlanById));
router.get("/support-plans",asyncHandler(getSupportPlans))
router.put('/support-plan/:id',asyncHandler(updateSupportPlan));
router.delete("/support-plan/:id",asyncHandler(deleteSupportPlan))
router.post('/add-session',asyncHandler(addSession));
router.get('/session',asyncHandler(getSessions))
router.delete('/session/:id',asyncHandler(deleteSession))

export default router;