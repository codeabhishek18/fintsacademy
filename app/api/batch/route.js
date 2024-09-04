import dbConnect from "@/dbConfig/dbConnect";
import batchService from "@/services/batch.service";
const batchInstance = new batchService();
import courseService from "@/services/course.service";
const courseInstance = new courseService();
import sessionService from "@/services/session.service";
import { NextResponse } from "next/server";
const sessionInstance = new sessionService();

export async function POST(req, {params})
{
    try
    {
        await dbConnect();

        const { title, courseId, mentor, startDate, endDate } = await req.json(); 
        console.log(title, courseId, mentor, startDate, endDate)

        const newBatch = await batchInstance.addNewBatch(title, courseId, mentor, startDate, endDate);
        const course = await courseInstance.getByCourseId(courseId);

        console.log(course);

        let id=1;
        for(let lecture of course.lectures)
        {
            const batchSession = await sessionInstance.addNewSession(id, lecture.description, lecture.duration)
            await batchInstance.updateSessions(newBatch._id, batchSession._id);
            id++;
        }
        return NextResponse.json({message: 'Batch added'})
    }
    catch(error)
    {
        return NextResponse.json({error: error});
    }
}

export async function GET(req, res)
{
    try
    {
        await dbConnect();

        const batches = await batchInstance.getAllBatches();
        return NextResponse.json(batches)
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}