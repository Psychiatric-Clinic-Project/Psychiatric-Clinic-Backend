import supportModel from "../../../Database/models/support.model.js";
import { createdSuccessfullyMessage, retrievedSuccessfullyMessage } from "../../utils/index.js";

export const requestSupport = async (req, res) => {
  const { request } = req.body;
  const userId = req.user._id;
  const supportRequest = await supportModel.create({ userId, request });
  return res.success(supportRequest, createdSuccessfullyMessage("Request for support"), 200);
};

export const getSupportRequest = async (req, res) => {
  const userId = req.user._id;
  const userSupportRequests = await supportModel.find({ userId });
  return res.success(userSupportRequests, retrievedSuccessfullyMessage("Support requests"), 200);
}