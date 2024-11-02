import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { adminModel } from "../../../database/models/admin.model.js";
import { coachModel } from "../../../database/models/coach.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { advisorModel } from "../../../database/models/advisor.model.js";
import { notFoundMessage, retrievedSuccessfullyMessage,createdSuccessfullyMessage } from "../../utils/index.js";
import { ROLES } from "../../constant.js";
import sendEmail from "../../utils/email.js";



export const userSignUp = async (req, res) => {
    const { username, email, password, age, category, phoneNumber } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.error("User already exist",409)
    }
    const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    const newUser = new userModel({
        username,
        email,
        password: hash,
        age,
        category,
        phoneNumber,
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id,role:ROLES.user }, process.env.LOGINTOKEN, { expiresIn: "1h" });
    const verificationUrl = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}auth/verify-email/${token}`;
    await sendEmail(username, email, verificationUrl);
    return res.success({userId: newUser._id, token },createdSuccessfullyMessage("User"),201)

};

export const advisorSignUp = async (req, res) => {
  const { name, email, password, age, phoneNumber, skills } = req.body;

  const existingAdvisor = await advisorModel.findOne({ email });
  if (existingAdvisor) {
    return res.error("Advisor already exists", 409);
  }

  const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));

  const newAdvisor = new advisorModel({
    name,
    email,
    password: hash,
    age,
    phoneNumber,
    skills,
  });
  await newAdvisor.save();

  const token = jwt.sign({ userId: newAdvisor._id, role: "advisor" }, process.env.LOGINTOKEN, { expiresIn: "1h" });
  const verificationUrl = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}auth/verify-email/${token}`;

  await sendEmail(name, email, verificationUrl);
  return res.success({ userId: newAdvisor._id, token }, createdSuccessfullyMessage("Advisor"), 201);
};

export const coachSignUp = async (req, res) => {
  const { name, email, password, age, phoneNumber, skills } = req.body;

  const existingCoach = await coachModel.findOne({ email });
  if (existingCoach) {
    return res.error("Coach already exists", 409);
  }

  const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));

  const newCoach = new coachModel({
    name,
    email,
    password: hash,
    age,
    phoneNumber,
    skills,
  });
  await newCoach.save();

  const token = jwt.sign({ userId: newCoach._id, role: "coach" }, process.env.LOGINTOKEN, { expiresIn: "1h" });
  const verificationUrl = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}auth/verify-email/${token}`;

  await sendEmail(name, email, verificationUrl);
  return res.success({ userId: newCoach._id, token }, createdSuccessfullyMessage("Coach"), 201);
};


export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.error("Token is required", 500);
  }

  try {
    const decoded = jwt.verify(token, process.env.LOGINTOKEN);
    const userId = decoded.userId;

    let user;
    if (decoded.role === "user") {
      user = await userModel.findById(userId);
    } else if (decoded.role === "advisor") {
      user = await advisorModel.findById(userId);
    } else if (decoded.role === "coach") {
      user = await coachModel.findById(userId);
    }

    if (!user) {
      return res.error(notFoundMessage("User"), 404);
    }

    user.isVerified = true;
    await user.save();
    return res.success("Email verified successfully!", 200);

  } catch (error) {
    console.error("Verification error:", error);
    return res.error("Invalid or expired token", 401);
  }
};


export const signIn = async (req, res) => {
  const { email, password } = req.body;

  let user = await adminModel.findOne({
    email,
  });

  if (!user) {
    user = await userModel.findOne({
       email,
    });
  }
  if (!user) {
    user = await advisorModel.findOne({
       email,
    });
  }
  if (!user) {
    user = await coachModel.findOne({
       email,
    });
  }
  if (!user) {
    return res.error(notFoundMessage("Account"), 404);
  }
  
  if (user.role !== ROLES.admin && !user.isVerified) {
    return res.error("Please verify your email", 400);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.error("Invalid password", 500);
  }

  const token = jwt.sign(
    {
      id: user._id,
      role:user.role
    },
    process.env.LOGINTOKEN,
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  return res.success({ token }, retrievedSuccessfullyMessage("Account"), 200);
};

