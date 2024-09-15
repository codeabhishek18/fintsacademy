import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import chatService from "@/services/chat.service"; 
const chatInstance=new chatService();

export async function GET(req, {params})
{
    try
    {
        await dbConnect();

        const {chatId} = params;
        const chat = await chatInstance.getChatById(chatId);
        return NextResponse.json(chat)
    }
    catch(error)
    {
        return NextResponse.json({error})
    }
}