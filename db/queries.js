import { eventSchemaModel, userSchemaModel } from "@/models/schema-models";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/mongo-id-converter";
import mongoose from "mongoose";

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

export const findUser = async (credentials) => {
  const user = await userSchemaModel.findOne(credentials).lean();

  if (user) {
    return replaceMongoIdInObject(user);
  } else {
    return null;
  }
};

export const updateEveInterest = async (eveID, authID) => {
  const event = await eventSchemaModel.findById(eveID);

  if (event) {
    const interestedUsers = event.interested_ids.find(
      (id) => id.toString() === authID
    );

    if (interestedUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authID));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authID));
    }

    event.save();
  }
};

export const updateGoing = async (eveID, authID) => {
  const event = await eventSchemaModel.findById(eveID);
  event.going_ids.push(new mongoose.Types.ObjectId(authID));
  event.save();
};
