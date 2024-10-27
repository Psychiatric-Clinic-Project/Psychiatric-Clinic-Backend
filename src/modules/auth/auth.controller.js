import bcrypt from "bcryptjs";
import { userModel } from "../../../Database/models/user.model.js";
import sendEmail from "../../utils/email.js";
import jwt from "jsonwebtoken";
import { advisorModel } from "../../../Database/models/advisor.model.js";
import { coachModel } from "../../../Database/models/coach.model.js";
import { ROLES } from "../../constant.js";
import { createdSuccessfullyMessage, notFoundMessage } from "../../utils/index.js";

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
    return res.success({userId: newUser._id, token },createdSuccessfullyMessage("User"),200)

};


export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.error( "Token is required",404 );
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
    return res.status(200).json({ message: "Email verified successfully!" });
};

  

