import { prismaInstance } from "./prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prismaInstance.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (err) {
    console.error(`ERROR IN fetchUserByEmail : ${err}`);
  }
};

export const createUser = () => {

};
