import { model, Schema } from "mongoose";

const advisorSchema = new Schema(
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
      default: false,
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
    sendCode: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "advisor",
    },
  },
  {
    timestamps: true,
  }
);

export const advisorModel = model("Advisor", advisorSchema);
