import supportModel from "../../../Database/models/support.model.js";
import { retrievedSuccessfullyMessage } from "../../utils/index.js";

export const requestSupport = async (req, res) => {
  console.log("first")
  const { request } = req.body;
  const userId = req.user._id;
  const supportRequest = await supportModel.create({ userId, request });
  return res.status(201).json(supportRequest);
};

export const getSupportRequest = async (req, res) => {
  const userId = req.user._id;
  const userSupportRequests = await supportModel.find({ userId });
  return res.success({ userSupportRequests }, retrievedSuccessfullyMessage("Support requests"), 200);
}