import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import batchService from "@/services/batch.service";
const batchInstance = new batchService();

export async function GET(req, {params})
{
    try
    {
        await dbConnect();
        const {courseId} = params;
        const allBatches = await batchInstance.getAllBatches();
        const batch = allBatches.filter((batch) => batch.course.id === courseId).find(batch => batch.status === 'Upcoming')
        return NextResponse.json({batch});
    }
    catch(error)
    {
        return NextResponse.json({error});
    }

}