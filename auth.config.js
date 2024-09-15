import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import userService from "./services/user.service"
import dbConnect from "./dbConfig/dbConnect";
const userInstance = new userService();
 
export default { 
    providers:
    [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            }
        },
    ),
        Credentials({
            credentials:
            {
                email: {},
                password: {}    
            },
            async authorize(credentials)
            {
                try
                {
                    await dbConnect();

                    const { email, password } = credentials;
                    if(email && password)
                    {
                        const user = await userInstance.findByEmail(email)
                        if(!user)
                            return null
                        
                        const isMatch = await userInstance.checkPassword(password, user.password);
                        if(!isMatch)
                            return null
                        return user
                    }   
                    return null
                }
                catch(error)
                {
                    throw error
                }
            }
        })
    ] }