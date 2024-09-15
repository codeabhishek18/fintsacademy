import chatService from "@/services/chat.service";
const chatInstance = new chatService();
import userService from "@/services/user.service";
const userInstance = new userService();
import messageService from "@/services/message.service";
const messageInstance = new messageService();
import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req, {params})
{
    try
    {
        await dbConnect();
        const {sender, receiver, chatId} = params;
        const {text} = await req.json();

        console.log(typeof(chatId))

        const message = await messageInstance.create(sender, receiver, text)
        if(chatId === 'null')
        {
            const newChat = await chatInstance.create(sender, receiver, message._id);
            await userInstance.updateChat(sender, newChat._id)
            await userInstance.updateChat(receiver, newChat._id)
        }   
        else
        {
            await chatInstance.updateChat(chatId, message._id);  
        }

        console.log(sender, receiver, chatId, text)

        return NextResponse.json({message: 'sent'})
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}