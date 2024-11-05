import { Schema, model, Types } from "mongoose";
import { ROLES } from "../../src/constant.js";

const trainingReportSchema = new Schema(
  {
    advisorId: {
      type: Types.ObjectId,
      ref: "Advisor",
    },
    coachId: {
      type: Types.ObjectId,
      ref: "Coach",
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
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

const TrainingReport = model("TrainingReport", trainingReportSchema);

export default TrainingReport;
