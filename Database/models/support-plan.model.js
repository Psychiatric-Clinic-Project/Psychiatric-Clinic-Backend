import { Schema, model, Types } from "mongoose";
import { ROLES } from "../../src/constant.js";

const supportPlanSchema = new Schema(
  {
    advisorId: {
      type: Types.ObjectId,
      ref: "Advisor",
    },
    coachId: {
      type: Types.ObjectId,
      ref: "Coach",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdByRole: {
      type: String,
      enum: [ROLES.advisor, ROLES.coach],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SupportPlan = model("SupportPlan", supportPlanSchema);

export default SupportPlan;
