"use server";

import EmailTemplate from "@/components/EmailTemplate";
import {
  createUser,
  findUser,
  getEventByID,
  updateEveInterest,
  updateGoing,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

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
    await sendMail(eveID, user);
  } catch (error) {
    console.error(error);
    throw error;
  }
  revalidatePath("/");
  redirect("/");
};

export const sendMail = async (eveID, user) => {
  try {
    const event = await getEventByID(eveID);

    const resend = new Resend(process.env.RS_API);

    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: user?.email,
      subject: "Successfully Registered for the event!",
      react: EmailTemplate({ message }),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
