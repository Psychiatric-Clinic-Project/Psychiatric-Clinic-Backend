import { Schema, model, Types } from "mongoose";
import { ROLES, SESSION_STATUS } from "../../src/constant.js";

const sessionSchema = new Schema(
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
        time: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: SESSION_STATUS.Pending,

        },
        available: {
            type: Boolean,
            required: true,
            default: false,
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

const Session = model("Session", sessionSchema);

export default Session;