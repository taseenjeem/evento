import { eventSchemaModel, userSchemaModel } from "@/models/schema-models";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/mongo-id-converter";

export const getAllEvents = async () => {
  const events = await eventSchemaModel.find().lean();
  return replaceMongoIdInArray(events);
};

export const getEventByID = async (eventID) => {
  const event = await eventSchemaModel.findById(eventID).lean();
  return replaceMongoIdInObject(event);
};

export const createUser = async (userInfo) => {
  return await userSchemaModel.create(userInfo);
};
