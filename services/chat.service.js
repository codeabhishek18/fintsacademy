import { Message } from "@/models/message.model.js";
import { Chat } from "../models/chat.model.js";

class chatService
{

    async create(sender, receiver, message)
    {
        try
        {
            const newChat = await Chat.create({sender, receiver, message})
            await newChat.save();
            return newChat;
        }
        catch(error)
        {
            throw error
        }
    }

    async updateChat(chatId, message)
    {
        try
        {
            return await Chat.findByIdAndUpdate(chatId, {$push: {message : message}});
        }
        catch(error)
        {
            throw error
        }
    }

    async getChatById(id)
    {
        try
        {
           const chat = await Chat.findById(id)
           .populate(
            {
                path: 'message',
                model: Message
            })
           return chat
        }
        catch(error)
        {
            throw error
        }
    }
}

export default chatService