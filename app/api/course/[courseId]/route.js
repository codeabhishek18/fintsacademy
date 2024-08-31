import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import courseService from "@/services/course.service";
const courseInstance = new courseService();

export async function GET(req, {params}) 
{
    try
    {
        await dbConnect();

        const { courseId } = params
        const course = await courseInstance.findById(courseId);
        if(!course)
            throw new Error('Course not found');
        return NextResponse.json({course})
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
} 
