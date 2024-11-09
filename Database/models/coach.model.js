import { model, Schema } from "mongoose";

const coachSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default:true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    verificationCode: {
      // New field to store verification code
      type: String,
      default: null,
    },
    sendCode: {
      // This could track if a verification code was sent
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "coach",
    },
  },
  {
    timestamps: true,
  }
);

export const coachModel = model("Coach", coachSchema);
