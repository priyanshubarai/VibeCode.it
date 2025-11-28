"use server";

export const Register = async (formdata : FormData) => {
    console.log("register function called ")
    const username = formdata.get('username') as string
    const email = formdata.get('email') as string
    const password = formdata.get('password') as string
    
    
}