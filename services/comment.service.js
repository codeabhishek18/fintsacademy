import { Comment } from "@/models/comment.model";

class commentService
{
    async addNewComment(author, comment)
    {
        try
        {
            const newComment = await Comment.create({author, comment});
            await newComment.save();
            return newComment
        }
        catch(error)
        {
            return error
        }
    }

    async addReplyToComment(commentId, replyId)
    {
        try
        {
            return await Comment.findByIdAndUpdate(commentId, {$push:{replies: replyId}})
        }
        catch(error)
        {
            return error
        }
    }
}

export default commentService