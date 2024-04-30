"use server";

import {
  createUser,
  findUser,
  updateEveInterest,
  updateGoing,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const registerUser = async (formData) => {
  const user = Object.fromEntries(formData);

  try {
    await createUser(user);
  } catch (error) {
    console.error(error);
  } finally {
    redirect("/login");
  }
};

export const userLogin = async (formData) => {
  try {
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const userFounded = await findUser(credentials);

    return userFounded;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const interestInEvent = async (eveID, authId) => {
  try {
    await updateEveInterest(eveID, authId);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    revalidatePath("/");
  }
};

export const addGoingOnEvent = async (eveID, user) => {
  try {
    await updateGoing(eveID, user?.id);
  } catch (error) {
    console.error(error);
    throw error;
  }
  revalidatePath("/");
  redirect("/");
};
