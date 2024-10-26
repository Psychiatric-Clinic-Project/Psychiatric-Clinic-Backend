import jwt from "jsonwebtoken";
import { adminModel }from "../../database/models/admin.model.js";
import { notFoundMessage } from "../utils/index.js";

export const adminAuth = (accessRoles = []) => {
  return async (req, res, next) => {
    let { token } = req.headers;

    if (!token.startsWith(process.env.AUTH_BEARER_TOKEN)) {
      return res.error("Ivalid token", 500);
    }

    token = token.split("__")[1];
    const decoded = await jwt.verify(token, process.env.LOGINTOKEN);
    const admin = await adminModel
      .findOne({
        _id: decoded.id,
      })

    if (!admin) {
      return res.error(notFoundMessage("Account"), 404);
    }
    console.log(admin)
    console.log(admin.email)
    if (!accessRoles.includes(admin.role)) {
      return res.error("You are not authorized to access to this endpont", 401);
    }
    req.user = user;
    next(); 
  };
};
