import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { adminModel } from "../../../database/models/admin.model.js";
import { coachModel } from "../../../database/models/coach.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { advisorModel } from "../../../database/models/advisor.model.js";
import { notFoundMessage, retrievedSuccessfullyMessage,createdSuccessfullyMessage } from "../../utils/index.js";
import { ROLES } from "../../constant.js";
import sendEmail from "../../utils/email.js";

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

export const userSignUp = async (req, res) => {
    const { username, email, password, age, category, phoneNumber } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.error("User already exist",404)
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
        status: "Under Treatment"
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id,role:ROLES.user }, process.env.LOGINTOKEN, { expiresIn: "1h" });
    const verificationUrl = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}auth/verify-email/${token}`;
    await sendEmail(username, email, verificationUrl);
    return res.success({userId: newUser._id, token },createdSuccessfullyMessage("User"),201)

};

export const coachSignUp = async (req, res,next) => {
  const { name, email, password, age, phoneNumber, skills } = req.body;

  const existingCoach = await coachModel.findOne({ email });
  if (existingCoach) {
    return res.error("Coach already exist",404)
   }
  const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
  
  const newCoach = new coachModel({
    name,
    email,
    password: hash,
    age,
    phoneNumber,
    skills,
    isVerified: false,
    isBlocked: false,
  });
  await newCoach.save();
  const token = jwt.sign({ coachId: newCoach._id, role: "coach" }, process.env.LOGINTOKEN, { expiresIn: "1h" });
  const verificationUrl = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}auth/verify-email/${token}`;
  
  await sendEmail(name, email, verificationUrl);
  return res.success({coachId: newCoach._id, token },createdSuccessfullyMessage("Coach"),201);
};

export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.error( "Token is required",500 );
    }
    const decoded = jwt.verify(token, process.env.LOGINTOKEN);
    const userId = decoded.userId;
    let user;
    if(decoded.role=== ROLES.user){
       user = await userModel.findById(userId);
    }
    if(decoded.role=== ROLES.advisor){
        user = await advisorModel.findById(userId);
    }
    if(decoded.role=== ROLES.coach){
         user = await coachModel.findById(userId);
    }
    if (!user) {
        return res.success(notFoundMessage("User"),404)
    }
    user.isVerified = true;
    await user.save();
    return res.success("Email verified successfully!",200);
};

