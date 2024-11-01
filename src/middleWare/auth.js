import jwt from "jsonwebtoken";
import { adminModel } from "../../database/models/admin.model.js";
import { coachModel } from "../../database/models/coach.model.js";
import { advisorModel } from "../../database/models/advisor.model.js";
import { userModel } from "../../database/models/user.model.js";
import { notFoundMessage } from "../utils/index.js";
import { asyncHandler } from "./asyncHandler.js";

export const auth = (accessRoles = []) => {
  return asyncHandler(async (req, res, next) => {
    if(!req.headers?.token){
      return res.error("Token missing from header", 500);
    }

    let { token } = req.headers;

    if (!token.startsWith(process.env.AUTH_BEARER_TOKEN)) {
      return res.error("Ivalid token", 500);
    }

    token = token.split("__")[1];
    const decoded = await jwt.verify(token, process.env.LOGINTOKEN);
    let user = await adminModel.findOne({
      _id: decoded.id,
    });
    if (!user) {
      user = await coachModel.findOne({
        _id: decoded.id,
      });
    }
    if (!user) {
      user = await advisorModel.findOne({
        _id: decoded.id,
      });
    }
    if (!user) {
      user = await userModel.findOne({
        _id: decoded.id,
      });
    }

    if (!user) {
      return res.error(notFoundMessage("Account"), 404);
    }
    if (!accessRoles.includes(user.role)) {
      return res.error("You are not authorized to access to this endpont", 401);
    }
    req.user = user;
    next();
  });
};
