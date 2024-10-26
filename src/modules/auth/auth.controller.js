import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { adminModel } from "../../../database/models/admin.model.js";
import { coachModel } from "../../../database/models/coach.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { notFoundMessage, retrievedSuccessfullyMessage } from "../../utils/index.js";
import { advisorModel } from "../../../database/models/advisor.model.js";
import { ROLES } from "../../constant.js";

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
