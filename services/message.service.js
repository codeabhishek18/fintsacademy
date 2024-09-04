import { Message } from "../models/message.model.js";

class messageService
{

    async create(sender, receiver, text)
    {
        const newText = await Message.create({sender, receiver, text});
        await newText.save();
        return newText;
    }
}

export default messageService