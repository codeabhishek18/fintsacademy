'use client'

import { TextField } from '@mui/material'
import ForumKey from '../forumKey/ForumKey'
import ForumKeyword from '../forumKeyword/ForumKeyword'
import styles from './ForumPost.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Button from '../button/Button'
import { toast } from 'sonner'

const ForumPost = ({getDiscussions, getTopics, setShowPost}) =>
{
    const [ title, setTitle ] = useState('');
    const [ keyList, setKeyList ] = useState([]);
    const session = useSession();
    const user = session?.data?.user?.id
    
    const handlePost = async (e) =>
    {
        e.preventDefault();

        try
        {
            const url = '/api/forum'
            await axios.post(url, {title, author: user, keywords: keyList});
            getDiscussions();
            setShowPost(false);
            // getTopics()
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
        if(!word)
            return toast.error('Keyword cannot be empty')

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
                <TextField size='large' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D', color: '#D4313D'}, 'aria-label': 'Without label'}}}
                placeholder='Discussion Topic' name="title" className={styles.input} value={title} onChange={(e)=> setTitle(e.target.value)} />

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
                </div>
            </div>
            <ForumKeyword handleKeywords={handleKeywords}/>
            <div className='flex gap-4'>
                <Button action={()=> setShowPost(false)} label='Cancel' fullwidth={true}/>
                <Button action={handlePost} label='Post' fullwidth={true}/>
            </div>
        </div>   
    )
}

export default ForumPost