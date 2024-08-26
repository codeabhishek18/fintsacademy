import dbConnect from "@/dbConfig/dbConnect";
import { Course } from "@/models/course.model";
import { Lecture } from "@/models/lecture.model";
import { NextResponse } from "next/server";

export async function GET(req, {params}) 
{
    try
    {
        await dbConnect();

        const { courseId } = params
        const course = await Course.findOne({id: courseId}).populate({path: 'lectures', model: Lecture});
        if(!course)
            throw new Error('Course not found');
        return NextResponse.json({course})
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
} 
