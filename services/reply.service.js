import { Reply } from "../models/reply.model.js"

class replyService
{
    async addNewReply(author, reply)
    {
        try
        {
            const newReply = await Reply.create({author, reply});
            await newReply.save();
            return newReply;
        }
        catch(error)
        {
            throw new Error('Failed update reply')
        }
    }
}

export default replyService