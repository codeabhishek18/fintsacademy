'use client'

import styles from './Comment.module.css'
import { TextField } from "@mui/material";
import axios from 'axios';
import { useState } from 'react';
import ReplyCard from '../replyCard/ReplyCard';
import Image from 'next/image';
import upArrow from '@/assets/show.png'
import downArrow from '@/assets/drop.png'

const Comment = ({comment, getDiscussions, user}) =>
{
    const [ reply, setReply ] = useState(null)
    const [ viewReply, setViewReply ] = useState(null)
    const [ showReply, setShowReply ] = useState(null);

    const handleReply = async (id) =>
    {
        try
        {
            if(user)
            {
                const url = `/api/reply/${id}`
                await axios.post(url, {reply, author: user})
                getDiscussions('/api/forum');
                setReply('');
                setViewReply(id)
            }
            
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

            {(comment.replies?.length > 0 ? 
            <div className={styles.repliesCount} 
                onClick={()=>
                { 
                    setViewReply((prev)=> prev === comment._id ? null : comment._id); 
                    setShowReply((prev)=> prev === comment._id ? null : comment._id)
                }
            }><Image className={styles.arrows} src={viewReply === comment._id ? downArrow : upArrow} alt='comments'/>{comment.replies?.length} {comment.replies?.length > 1 ? 'replies' : 'reply'}</div> : <></>)}

            {viewReply === comment._id &&
            <div className={`${styles.replies} ${styles.rereply}`}>
                {comment.replies.map((reply) =>
                (
                    <ReplyCard key={reply._id} data={reply} type="reply"/>
                ))}
            </div> }
            
            
            {showReply === comment._id && 
            <div className={`${styles.input} ${styles.rereply}`}>
                <TextField
                    InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}}
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