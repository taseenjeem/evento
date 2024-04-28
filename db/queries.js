import { schemaModel } from "@/models/schema-models";
import { replaceMongoIdInArray } from "@/utils/mongo-id-converter";

export const getAllEvents = async () => {
  const events = await schemaModel.find().lean();
  return replaceMongoIdInArray(events);
};
