import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import triggerResponseService from "@/services/triggerResponse.service";
const triggerResponseInstance = new triggerResponseService();

export async function GET(req, {params}) 
{
    try
    {
        await dbConnect();

        const { triggerResponseId } = params;
        const trigger = await triggerResponseInstance.getTriggerResponseById(triggerResponseId);
        return NextResponse.json(trigger); 
    }   
    catch(error)
    {
        return NextResponse.json({error: error.message})
    } 
}

export async function PUT(req, {params}) 
{
    try
    {
        await dbConnect();

        const { triggerResponseId } = params;
        const { response } = await req.json();
        await triggerResponseInstance.updateTriggerResponse(triggerResponseId, response);
        return NextResponse.json({ message: 'Response submitted' }); 
    }   
    catch(error)
    {
        return NextResponse.json({error: error.message})
    } 
}