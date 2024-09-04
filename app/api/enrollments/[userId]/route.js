import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import userService from "@/services/user.service";
const userInstance = new userService();
import batchService from "@/services/batch.service";
const batchInstance = new batchService();
import enrollmentService from "@/services/enrollment.service";
const enrollmentInstance = new enrollmentService(); 

export async function POST(req, {params}) 
{
    try
    {
        await dbConnect();

        const { userId } = params;
        const { batchId } = await req.json();
        const enrollment = await enrollmentInstance.enroll(userId, batchId)
        await userInstance.updatEnrollment(userId, enrollment._id);
        await batchInstance.enrollUser(batchId, userId) 
        return NextResponse.json({message : 'Enrollment successfull'});
    }    
    catch(error)
    {
        return NextResponse.json({error})
    }
}