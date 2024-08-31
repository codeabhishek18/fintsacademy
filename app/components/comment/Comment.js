'use client'

import styles from './Comment.module.css'
import { TextField } from "@mui/material";
import axios from 'axios';
import { useState } from 'react';
import ReplyCard from '../replyCard/ReplyCard';

const Comment = ({comment, getDiscussions, user}) =>
{
    const [ reply, setReply ] = useState(null)
    const [ viewReply, setViewReply ] = useState(null)
    const [ showReply, setShowReply ] = useState(null);

    const handleReply = async (id) =>
    {
        try
        {
            const url = `/api/reply/${id}`
            await axios.post(url, {reply, author: user})
            getDiscussions('/api/forum');
            setReply('');
            setViewReply(id)
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <div className={styles.container} key={comment._id}>
            <ReplyCard 
                key={comment._id} data={comment} 
                type="comment" setShowReply={setShowReply} 
                replyId={comment._id}
            />

            {viewReply === comment._id ? 
            <div className={`${styles.replies} ${styles.rereply}`}>
                {comment.replies.map((reply) =>
                (
                    <ReplyCard key={reply._id} data={reply} type="reply"/>
                ))}
            </div> :
            (comment.replies?.length > 0 ? 
            <p className={styles.repliesCount} 
                onClick={()=>
                { 
                    setViewReply(comment._id); 
                    setShowReply(comment._id)
                }
            }>{comment.replies?.length} {comment.replies?.length > 1 ? 'replies' : 'reply'}</p> : <></>)}
            
            {showReply === comment._id && 
            <div className={`${styles.input} ${styles.rereply}`}>
                <TextField
                    variant="outlined" size='small' 
                    color='grey' className={styles.reply} 
                    name="reply" placeholder="Reply" 
                    onChange={(e)=> setReply(e.target.value)}
                />
                <button className={styles.post} onClick={()=> handleReply(comment._id)}>Send</button>
            </div>}
        </div>   
    )
}

export default Comment