'use server'

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function doLogout() 
{
  await signOut({ redirectTo: "/" });
}

export async function googleLogin()
{
    await signIn('google', {redirectTo: '/dashboard'});
} 

export async function credentialLogin(formData) 
{
    try 
    {
       await signIn("credentials", 
        {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        })
    } 
    catch (error) 
    {
        if (error instanceof AuthError) 
        {          
            switch (error.type) 
            {
                case 'CredentialsSignin':
                    return {error: 'Invalid credentials'};
                default:
                    return {error: 'Something went wrong'};
            }
        }
        throw error;
      }
};