import { model, Schema, Types } from "mongoose";

const participantSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
        },
        advisorId: {
            type: Types.ObjectId,
            ref: "Advisor",
        },
        coachId: {
            type: Types.ObjectId,
            ref: "Coach",
        }
    },
    {
        timestamps: true,
    }
);
const participantModel = model("Participant", participantSchema);

export default participantModel;
