"use server";

import { redirect } from "next/navigation";
import { prismaInstance } from "../prisma";
import { CredentialsSignin } from "next-auth";
import { signIn } from "../auth";
import bcrypt from "bcrypt";

export const Register = async (formdata: FormData) => {
  const username = formdata.get("username") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  if (!username || !email || !password) {
    console.log("Fields are missing!");
    return;
  }

  let user = null;
  try {
    user = await prismaInstance.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      console.log("user already exist : ", user);
      redirect("/login");
    } else {
      console.log("No user Found!");
    }
  } catch (err) {
    console.error("error in searching user : ", err);
  }

  try {
    const hash = await bcrypt.hash(password, 12);
    const prismaResponse = await prismaInstance.user.create({
      data: {
        name: username,
        email: email,
        hashedPassword: hash,
      },
    });
    console.log("successfully registered: ", prismaResponse);
  } catch (err) {
    console.error("error in creating user : ", err);
  }
  redirect("/login");
};

export const Login = async (formdata: FormData) => {

  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string; 
  try {
    const res = await signIn("credentials",{
      redirect: false,
      callbackUrl: '/',
      email,
      password
    });
    console.log("auth response : ",res)
  } catch (err) {
    console.log("error in auth signing in : ",err)
    const someError = err as CredentialsSignin;
    console.log("SomeError : ",someError.cause)
    return someError.cause;
  }
  redirect('/');
};
