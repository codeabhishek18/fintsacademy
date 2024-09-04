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
            throw new Error('Failed to create chat')
        }
    }

    // async setChatUser(chatId, sender, receiver)
    // {
    //     try
    //     {
    //         return await Chat.findByIdAndUpdate(chatId, {$set: {sender: sender, }})
    //     }
    //     catch(error)
    //     {
    //         throw new Error(error);
    //     }
    // }

    async updateChat(chatId, message)
    {
        try
        {
            return await Chat.findByIdAndUpdate(chatId, {$push: {message : message}});
        }
        catch(error)
        {
            throw new Error('Message failed')
        }
    }

    // async findChat(id)
    // {
    //     try
    //     {
    //        const sender = await Chat.some((fi))
    //        return sender
    //     }
    //     catch(error)
    //     {
    //         throw new Error('Message failed')
    //     }
    // }
}

export default chatService