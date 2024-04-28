import { schemaModel } from "@/models/schema-models";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/mongo-id-converter";

export const getAllEvents = async () => {
  const events = await schemaModel.find().lean();
  return replaceMongoIdInArray(events);
};

export const getEventByID = async (eventID) => {
  const event = await schemaModel.findById(eventID).lean();
  return replaceMongoIdInObject(event);
};
