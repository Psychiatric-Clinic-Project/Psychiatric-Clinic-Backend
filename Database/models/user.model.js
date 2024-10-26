import { model, Schema } from "mongoose";
import { USER_CATEGORY, USER_STATUS } from "../../src/constant.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    age: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      enum: USER_CATEGORY,  
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    unKnownMember: {
      type: Boolean,
      default: false
    },
    status: {
        type: String,
        enum: USER_STATUS ,
        default: 'No Action Taken'
      }
  },
  {
    timestamps: true
  }
);

export const userModel = model("User", userSchema);
