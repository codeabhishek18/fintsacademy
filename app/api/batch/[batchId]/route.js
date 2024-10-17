import dbConnect from "@/dbConfig/dbConnect";
import batchService from "@/services/batch.service";
import { NextResponse } from "next/server";
const batchInstance = new batchService();

export async function GET(req, {params})
{
    try
    {
        await dbConnect();

        const {batchId} = params;
        const batch = await batchInstance.findById(batchId);
        return NextResponse.json(batch)
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

export async function DELETE(req, {params})
{
    try
    {
        await dbConnect();

        const {batchId} = params;
        await batchInstance.deleteById(batchId);
        return NextResponse.json({message: 'Batch deleted'})
    }
    catch(error)
    {
        return NextResponse.json(batch)
    }
}