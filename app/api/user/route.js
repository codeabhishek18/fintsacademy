
import dbConnect from "@/dbConfig/dbConnect";
import userService from "@/services/user.service";
const userInstance = new userService();


export async function GET(req, res)
{ 
  try
  { 
    
    await dbConnect();
    const users = await userInstance.findAll()
    return new Response(JSON.stringify({users}))
  }  
  catch(error)
  { 
    return new Response(JSON.stringify({error}))
  } 
}