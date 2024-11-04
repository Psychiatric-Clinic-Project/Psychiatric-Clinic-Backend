import StatusReport from "../../../Database/models/status-reports.model.js";
import SupportPlan from "../../../Database/models/support-Plan.model.js";
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




























































