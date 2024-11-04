import supportModel from "../../../Database/models/support.model.js";
import Session from "../../../Database/models/session.model.js";
import { getSearchQuery, populateCreatedBy, retrievedSuccessfullyMessage, updatedSuccessfullyMessage } from "../../utils/index.js";


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

export const selectSession = async (req, res) => {
    const { id } = req.params;
    const updatedSession = await Session.findByIdAndUpdate(
        id,
        {
            userId: req.user._id,
            status: 'Booked',
            available: false,
        },
        { new: true }
    );
    if (!updatedSession) {
        return res.error(notFoundMessage("Session"), 404);
    }
    return res.success(
        updatedSession,
        updatedSuccessfullyMessage("Session selected"),
        200
    );
};

export const getSessions = async (req, res) => {
    const session = await Session.find(
      getSearchQuery(req.user.role, req.user._id)
    );
    return res.success(
        session,
      retrievedSuccessfullyMessage("Sessions"),
      200
    );
  };

  export const cancelUserSession = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const updatedSession = await Session.findByIdAndUpdate(
            id,
            {
                userId: null, 
                available: true, 
                status: 'Available', 
            },
            { new: true } 
        );
        if (!updatedSession) {
            return res.error(notFoundMessage("Session"), 404);
        }
        return res.success(
           updatedSession ,
            updatedSuccessfullyMessage("Session canceled"),
            200
        );
};

