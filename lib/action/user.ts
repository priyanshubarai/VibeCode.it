"use server";
import { redirect } from "next/navigation";
import { prismaInstance } from "../prisma";

export const Register = async (formdata: FormData) => {
  const username = formdata.get("username") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  if(!username || !email || !password){
    console.log("Fields are missing!")
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
      console.log("user already exist : ",user);
      redirect("/login");
    }else{
        console.log("No user Found!")
    }
  } catch (err) {
    console.error("error in searching user : ", err);
  }

  try {
    let prismaResponse = await prismaInstance.user.create({
      data: {
        name: username,
        email: email,
        hashedPassword: password,
      },
    });
    console.log("successfully registered: ", prismaResponse);
  } catch (err) {
    console.error("error in creating user : ", err);
  }
  redirect("/login");
};

export const login = async (formdata: FormData) => {
  const email = formdata.get("email") as string
  const password = formdata.get("password") as string

  if( !email || !password){
    console.log("Fields are missing!")
    return;
  }
  let user = null
  try {
    user = await prismaInstance.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user && user.hashedPassword == password) {
        
    }else{
        console.log("Invalid Credentials!")
    }
  } catch (err) {
    console.error("User not Found");
  }
};
