import dbConnect from "@/dbConfig/dbConnect";
import groupService from "@/services/group.service";
import { NextResponse } from "next/server";
const groupInstance = new groupService();

export async function GET(req, {params})
{
    try
    {
        await dbConnect();
        const {groupId} = params
        const group = await groupInstance.findById(groupId);
        return NextResponse.json(group);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message});
    }
}