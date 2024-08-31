'use client'

import { TextField } from '@mui/material'
import ForumKey from '../forumKey/ForumKey'
import ForumKeyword from '../forumKeyword/ForumKeyword'
import styles from './ForumPost.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ForumPost = ({getDiscussions, getTopics}) =>
{
    const [ user, setUser ] = useState(null);
    const [ title, setTitle ] = useState('');
    const [ keyList, setKeyList ] = useState([]);
    
    useEffect(() =>
    {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user)
            setUser(user.id)
    },[])

    const handlePost = async (e) =>
    {
        e.preventDefault();

        try
        {
            const url = '/api/forum'
            await axios.post(url, {title, author: user, keywords: keyList});
            getDiscussions('/api/forum');
            getTopics()
            setTitle('')
            setKeyList([])
        }
        catch(error)
        {
            console.log(error);
        } 
    }

    const handleKeywords = (word) =>
    {
        let search = keyList.filter((key) => key === word);
        if(!search.length)
            setKeyList((prev) => [...prev, word])
    }

    const removeKeyWord = (word) =>
    {
        const newList = keyList.filter((key)=> key!==word );
        setKeyList(newList)
    }

    return(
        <div className={styles.container}>
            <div className={styles.forumheader}>
                <TextField 
                    multiline size='large' 
                    label='Post a discusssion' 
                    color='grey' name="title" 
                    className={styles.input} 
                    value={title} 
                    onChange={(e)=> setTitle(e.target.value)}
                />

                <div className={styles.footer}>
                    <div className={styles.list}>
                    {keyList?.map((key, index)=>
                    (   
                        <ForumKey 
                            key={index} type="edit" keyword={key}
                            removeKeyWord={removeKeyWord}
                        />
                    ))}
                    </div>
                    <button className={styles.post} onClick={handlePost}>Post</button>
                </div>
            </div>
            <ForumKeyword handleKeywords={handleKeywords}/>
        </div>   
    )
}

export default ForumPost