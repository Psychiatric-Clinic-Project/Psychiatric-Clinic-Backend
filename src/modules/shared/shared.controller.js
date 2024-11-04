import Session from "../../../Database/models/session.model.js";
import SupportPlan from "../../../Database/models/support-Plan.model.js";
import { SESSION_STATUS } from "../../constant.js";
import {
  createdSuccessfullyMessage,
  deletedSuccessfullyMessage,
  getSearchQuery,
  notFoundMessage,
  populateCreatedBy,
  retrievedSuccessfullyMessage,
  updatedSuccessfullyMessage,
} from "../../utils/index.js";

export const addSupportPlan = async (req, res) => {
  const { title, content } = req.body;
  const userRole = req.user.role;
  const newPlanData = populateCreatedBy(
    {
      title,
      content,
      createdByRole: userRole,
    },
    userRole,
    req.user._id
  );
  const newPlan = await SupportPlan.create(newPlanData);
  return res.success(newPlan, createdSuccessfullyMessage("Support Plan"), 201);
};

export const getSupportPlanById = async (req, res) => {
  const supportPlan = await SupportPlan.findById(req.params.id);
  if (supportPlan) {
    return res.success(
      supportPlan,
      retrievedSuccessfullyMessage("Support Plan"),
      200
    );
  }
  return res.error(notFoundMessage("Support plan"), 404);
};

export const getSupportPlans = async (req, res) => {
  const supportPlan = await SupportPlan.find(
    getSearchQuery(req.user.role, req.user._id)
  );
  return res.success(
    supportPlan,
    retrievedSuccessfullyMessage("Support Plans"),
    200
  );
};

export const updateSupportPlan = async (req, res) => {
  const { title, content } = req.body;

  const updatedPlanData = {
    title,
    content,
  };

  const updatedPlan = await SupportPlan.findByIdAndUpdate(
    req.params.id,
    updatedPlanData,
    {
      new: true,
    }
  );

  if (!updatedPlan) {
    return res.error(notFoundMessage("Support plan"), 404);
  }

  return res.success(
    updatedPlan,
    updatedSuccessfullyMessage("Support Plan"),
    200
  );
};

export const deleteSupportPlan = async (req, res) => {
  const deletedPlan = await SupportPlan.findByIdAndDelete(req.params.id);

  if (!deletedPlan) {
    return res.error(notFoundMessage("Support plan"), 404);
  }
  return res.success(null, deletedSuccessfullyMessage("Support plan"), 200);
};

export const addSession = async (req, res) => {
  const { title, time } = req.body;

  const createdBy = populateCreatedBy({}, req.user.role, req.user._id);

  const newSession = await Session.create({
    ...createdBy,
    title,
    time,
    status: SESSION_STATUS.Pending,
    available: true,
    createdByRole: req.user.role,
  });
  return res.success(newSession, createdSuccessfullyMessage("Session"), 201);
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

export const deleteSession = async (req, res) => {
  const { id } = req.params;
  const session = await Session.findByIdAndDelete(id);
      if (!session) {
          return res.error(notFoundMessage("Session"), 404);
      }
      return res.success(
         session ,
          deletedSuccessfullyMessage("Session"),
          200
      );
};


