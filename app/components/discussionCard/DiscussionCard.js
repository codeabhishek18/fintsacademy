'use client'

import styles from './DiscussionCard.module.css'
import { TextField } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Discussion from '../discussion/Discussion';
import Comment from '../comment/Comment';

const DiscussionCard = ({discussions, getDiscussions, getTopics}) =>
{   
    const [ comment, setComment ] = useState(null)
    const [ viewComment, setViewComment ] = useState(null)
    const [ user, setUser ] = useState(null)

    useEffect(() =>
    {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user)
            setUser(user.id)
    },[])

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
            await axios.post(url, {comment, author: user})
            getDiscussions('/api/forum');
            setComment('');
            setViewComment(id);
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

                    {viewComment === discussion._id ? 
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
                    </div> :
                    discussion.comments.length > 0 &&
                    <p className={styles.commentsCount} onClick={()=> setViewComment(discussion._id)}>
                       View {discussion.comments?.length} {discussion.comments?.length > 1 ? 'replies' : 'reply'}
                    </p>}
                </div>
            ))}
        </div>
    )
}

export default DiscussionCard