import { Schema, model, Types } from "mongoose";
import { ROLES } from "../../src/constant.js";

const statusReportSchema = new Schema(
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

const StatusReport = model("StatusReport", statusReportSchema);

export default StatusReport;
