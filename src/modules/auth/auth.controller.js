import bcrypt from "bcryptjs";
import { userModel } from "../../../Database/models/user.model.js";
import sendEmail from "../../utils/email.js";
import { emialTemplate } from "../../utils/EmailTemplate.js";
import jwt from "jsonwebtoken";

export const userSignUp = async (req, res) => {
  try {
      const { username, email, password, age, category, phoneNumber } = req.body;

      // Validate input
      if (!username || !email || !password || !age || !category || !phoneNumber) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }

      const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
      const newUser = new userModel({
        username,
          email,
          password: hash,
          age,
          category,
          phoneNumber,
          isVerified: false,
          isBlocked: false,
          unKnownMember: false,
          status: "No Action Taken"
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, process.env.LOGINTOKEN, { expiresIn: "1h" });
      const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

      // Send verification email
      await sendEmail(username, email, verificationUrl);

      return res.status(201).json({ message: "User registered successfully", userId: newUser._id, token });
  } catch (error) {
      console.error("Error during registration: ", error);
      return res.status(500).json({ message: "Server error", error: error.message });
  }
};

 export const verifyEmail = async (req, res) => {
  const { token } = req.params; // Accessing token from URL parameters

  if (!token) {
      return res.status(400).json({ message: "Token is required" });
  }

  try {
      const decoded = jwt.verify(token, process.env.LOGINTOKEN);
      const userId = decoded.userId;

      // Find the user by ID
      const user = await userModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Update isVerified status
      user.isVerified = true;
      user.status = "Verified";
      await user.save();

      return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
      console.error("Error during email verification: ", error);
      return res.status(500).json({ message: "Server error", error: error.message });
  }
};