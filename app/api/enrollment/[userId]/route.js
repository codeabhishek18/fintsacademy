import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

import userService from "@/services/user.service";
const userInstance = new userService();
import batchService from "@/services/batch.service";
const batchInstance = new batchService();
import enrollmentService from "@/services/enrollment.service";
const enrollmentInstance = new enrollmentService(); 
import courseService from "@/services/course.service";
const courseInstance = new courseService();
import triggerResponseService from "@/services/triggerResponse.service";
const triggerResponseInstance = new triggerResponseService();

export async function POST(req, {params}) 
{
    const session = await mongoose.startSession();
    session.startTransaction();

    try
    {
        await dbConnect();

        const { userId } = params;
        const { courseId, batchId } = await req.json();

        const course = await courseInstance.getByCourseId(courseId);
        const enrollment = await enrollmentInstance.enroll(userId, batchId);
        await userInstance.updateEnrollment(userId, enrollment._id);
        await batchInstance.enrollUser(batchId, enrollment._id.toString());

        for(let trigger of course.simulation)
        {
            const response = await triggerResponseInstance.createTriggerResponse(trigger._id.toString(), batchId, userId);
            await enrollmentInstance.assignSimulationTriggers(enrollment._id.toString(), response._id.toString())
        }
        return NextResponse.json({message : 'Enrolled successfully'});
    }    
    catch(error)
    {
        await session.abortTransaction();
        session.endSession();

        return NextResponse.json({error})
    }
}

export async function GET(req, {params}) 
{
    try
    {
        await dbConnect();

        const { userId } = params;
        const enrollment = await enrollmentInstance.getEnrollmentById(userId);
        
        return NextResponse.json(enrollment);
    }    
    catch(error)
    {
        return NextResponse.json({error})
    }
}