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

/**
 * @deprecated This function is deprecated and will be removed in future releases. 
 * Use the new alternative method instead.
 */
export const populateCreatedBy = (obj, role, id) => {
  console.warn("Warning: populateCreatedBy is deprecated and will be removed in future releases.");
  
  return {
    ...obj,
    ...mapToOriginId(role, id),
  };
};


export const mapToOriginId = (role, id) => ({ [ROLES_MAPPING[role]]: id });

export const createParticipant = async (role, id) => {
  await participantModel.create(mapToOriginId(role, id));
};
