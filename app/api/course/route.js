import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import courseService from "@/services/course.service";
const courseInstance = new courseService();

export async function GET() 
{
    try
    {
        await dbConnect();

        const courses = await courseInstance.findAll();
        if(!courses)
            throw new Error('Courses not found')
        return NextResponse.json({courses});
    }    
    catch(error)
    {
        return NextResponse.json({error})
    }
}