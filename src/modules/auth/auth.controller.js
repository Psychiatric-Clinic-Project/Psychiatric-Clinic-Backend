import bcrypt from "bcryptjs";
import { userModel } from "../../../Database/models/user.model.js";
import sendEmail from "../../utils/email.js";
import { emialTemplate } from "../../utils/EmailTemplate.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { advisorModel } from "../../../Database/models/advisor.model.js";
import { coachModel } from "../../../Database/models/coach.model.js";
import { ROLES } from "../../constant.js";

export const userSignUp = async (req, res) => {
    const { username, email, password, age, category, phoneNumber } = req.body;

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
        status: "Under Treatment"
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id,role:ROLES.user }, process.env.LOGINTOKEN, { expiresIn: "1h" });
    const verificationUrl = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}auth/verify-email/${token}`;
    await sendEmail(username, email, verificationUrl);
    return res.status(201).json({ message: "User registered successfully", userId: newUser._id, token });
};


export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
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
        return res.status(404).json({ message: "User not found" });
    }
    user.isVerified = true;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully!" });
};

// export const userSignIn = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });
//     if (!user) {
//         return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.status(401).json({ message: "Invalid credentials" });
//     }
//     if (!user.isVerified) {
//         return res.status(403).json({ message: "Please verify your email before logging in." });
//     }
//     const token = jwt.sign({ userId: user._id }, process.env.LOGINTOKEN, { expiresIn: "1h" });
//     return res.status(200).json({
//         message: "Login successful",
//         token,
//         userId: user._id,
//         userName: user.name,
//         category: user.category, // Include other user info as needed
//     });
// };

// export const sendCode = async (req, res, next) => {
//     const { email } = req.body;
//     let user = await userModel.findOne({ email });
//     if (!user) {
//         return res.status(404).json({ message: "User not found" });
//     } else {

//         const code = nanoid();
//         await sendEmail("Forget password", email, `verify code : ${code}`);
//         console.log("dertyuiop;lk")
//         return res.status(200).json({ message: "success" });
//     }
// };


// export const changePassword = async (req, res, next) => {
//     const { password, email } = req.body;
//         const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
//              let user, advisor, coach;
//         let updatedModel = userModel;
//         user = await userModel.findOne({ email }).select("email");
//                 if (!user) {
//             advisor = await advisorModel.findOne({ email }).select("email");
//             updatedModel = advisorModel;
//         }
//         if (!user && !advisor) {
//             coach = await coachModel.findOne({ email }).select("email");
//             updatedModel = coachModel;
//         }
//         if (!user && !advisor && !coach) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         const updated = await updatedModel.findOneAndUpdate(
//             { email },
//             { password: hash },
//             { new: true }
//         );
//         if (updated) {
//             return res.status(200).json({ message: "Password updated successfully" });
//         } else {
//             return res.status(500).json({ error: "Failed to update password" });
//         }
// };

// export const veriFyCode = async (req, res, next) => {
//     const { code, email } = req.body;
//     let updated;
  
//     // Try updating in userModel
//     updated = await userModel.findOneAndUpdate(
//       { email, verificationCode: code },
//       { sendCode: true },
//       { new: true }
//     );
  
//     // If not found in userModel, try advisorModel
//     if (!updated) {
//       updated = await advisorModel.findOneAndUpdate(
//         { email, verificationCode: code },
//         { sendCode: true },
//         { new: true }
//       );
//     }
  
//     // If still not found, try coachModel
//     if (!updated) {
//       updated = await coachModel.findOneAndUpdate(
//         { email, verificationCode: code },
//         { sendCode: true },
//         { new: true }
//       );
//     }
  
//     if (updated) {
//       return res.status(200).json({ message: "Verification successful" });
//     } else {
//       return res.status(404).json({ error: "Invalid code or email" });
//     }
//   };
  
      
  

