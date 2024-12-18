import dbConnect from "@/dbConfig/dbConnect";
import userService from "@/services/user.service";
import { NextResponse } from "next/server";
const userInstance = new userService();

export async function GET(req, {params})
{ 
    try
    { 
        await dbConnect();
         
        const { userId } = params;
        const user = await userInstance.getUserById(userId);
        console.log(userId)
        return NextResponse.json(user)
    }  
    catch(error)
    { 
        return NextResponse.json({error: error.message})
    } 
}

// export async function PUT(req, {params})
// { 
//     try
//     { 
//         await dbConnect();
         
//         const { userId } = params;
//         const { name } = await req.json()
//         await userInstance.updateUserName(userId, name);
//         return NextResponse.json({message: 'Username updated'})
//     }  
//     catch(error)
//     { 
//         return NextResponse.json({error: error.message})
//     } 
// }