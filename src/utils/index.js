import participantModel from "../../Database/models/participant .model.js";
import { ROLES, ROLES_MAPPING } from "../constant.js";

export const createdSuccessfullyMessage = (modelName) =>
  `${modelName} created successfully`;

export const updatedSuccessfullyMessage = (modelName) =>
  `${modelName} updated successfully`;

export const deletedSuccessfullyMessage = (modelName) =>
  `${modelName} deleted successfully`;

export const retrievedSuccessfullyMessage = (modelName) =>
  `${modelName} retrieved successfully`;

export const notFoundMessage = (modelName) => `${modelName} not found`;

export const operationFailedMessage = (modelName, operation) =>
  `Failed to ${operation} ${modelName}`;

export const populateCreatedBy = (obj, role, id) => {
  return {
    ...obj,
    ...getSearchQuery(role,id),
  };
};

export const getSearchQuery = (role, id) => ({ [ROLES_MAPPING[role]]: id });

export const getAdditionalParticipants = async (authenticatedUserId) => {
  const participants = await participantModel.find({
    role: { $in: [ROLES.user, ROLES.advisor, ROLES.coach] },
    _id: { $ne: authenticatedUserId }, 
  });
  return participants.map((participant) => participant._id);
};