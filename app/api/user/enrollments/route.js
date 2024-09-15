import dbConnect from "@/dbConfig/dbConnect";
import userService from "@/services/user.service";
import { NextResponse } from "next/server";
const userInstance = new userService();

export async function GET(req, res)
{ 
  try
  { 
    
    await dbConnect();
    const monthlyEnrollments = await userInstance.getMonthlyEnrollments()
    return NextResponse.json(monthlyEnrollments)
  }  
  catch(error)
  { 
    return NextResponse.json({error: error.message})
  } 
}