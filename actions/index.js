"use server";

import { createUser, findUser } from "@/db/queries";
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
