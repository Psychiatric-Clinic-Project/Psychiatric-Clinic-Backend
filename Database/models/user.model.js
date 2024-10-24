import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
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
      enum: ['Anxiety', 'Depression', 'Bipolar Disorder', 'PTSD', 'OCD', 'Other'],  
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
        enum: ['Under Treatment', 'Recovered', 'No Action Taken', 'In Progress'],
        default: 'No Action Taken'
      }
  },
  {
    timestamps: true
  }
);

export const userModel = model("User", userSchema);
