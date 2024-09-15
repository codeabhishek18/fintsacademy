'use client'

import styles from './DiscussionCard.module.css'
import { TextField } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Discussion from '../discussion/Discussion';
import Comment from '../comment/Comment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import upArrow from '@/assets/show.png'
import downArrow from '@/assets/drop.png'

const DiscussionCard = ({discussions, getDiscussions, getTopics}) =>
{   
    const [ comment, setComment ] = useState(null)
    const [ viewComment, setViewComment ] = useState(null)

    const session = useSession();
    const user = session?.data?.user?.id

    const handleDelete = async (id) =>
    {
        try
        {
            const url = `/api/forum/${id}`
            await axios.delete(url);
            getDiscussions('/api/forum');
            getTopics();
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const handleComment = async (id) =>
    {
        try
        {
            const url = `/api/comment/${id}`
            if(user)
            {
                await axios.post(url, {comment, author: user})
                getDiscussions('/api/forum');
                setComment('');
                setViewComment(id);
            }
            return
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <div className={styles.container}>
            {discussions.map((discussion) =>
            (
                <div className={styles.discussionCard} key={discussion._id}>
                    <Discussion 
                        key={discussion._id} 
                        id={discussion._id} 
                        author={discussion.author} 
                        title={discussion.title} 
                        date={discussion.createdAt} 
                        like={discussion.like} 
                        keywords={discussion.keywords} 
                        handleDelete={handleDelete}/>
                                          
                    <div className={styles.replySection}>
                        <TextField 
                            InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}}
                            variant='outlined' 
                            size='small' color='grey' 
                            className={styles.reply} 
                            name="comment" 
                            placeholder="Reply" 
                            onChange={(e)=> setComment(e.target.value)}
                        />
                        <button 
                            className={styles.post} 
                            onClick={()=> handleComment(discussion._id)}>
                            Send
                        </button>
                    </div>

                    { discussion.comments.length > 0 ?
                    <div className={styles.commentsCount} onClick={()=> setViewComment((prev) => prev  === discussion._id ? null : discussion._id)}>
                        {discussion.comments?.length}  {discussion.comments?.length > 1 ? 'resposes' : 'response'}
                       <Image className={styles.arrows} src={viewComment === discussion._id ? downArrow : upArrow} alt='comments'/> 
                    </div>:<p className={styles.noCount}>Be the first one to comment</p>}

                    {viewComment === discussion._id &&
                    <div className={styles.replies}>
                    {discussion.comments.map((comment) =>
                    (
                        <Comment 
                            key={comment._id} 
                            comment={comment} 
                            user={user}
                            getDiscussions={getDiscussions}
                        />
                    ))}
                    </div> }
                </div>
            ))}
        </div>
    )
}

export default DiscussionCard