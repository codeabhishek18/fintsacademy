import dbConnect from "@/dbConfig/dbConnect";
import batchService from "@/services/batch.service";
import { NextResponse } from "next/server";
const batchInstance = new batchService();

export async function POST(req, {params}) 
{
    try
    {   
        await dbConnect();

        const {batchId} = params;
        const {link} = await req.json();
        await batchInstance.updateZoomLink(batchId, link)
        return NextResponse.json({message : 'Updated'})
    }
    catch(error)
    {
        return NextResponse.json({error : error.message})
    }
}