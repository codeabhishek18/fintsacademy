'use client'

import styles from './styles.module.css'
import userIcon from '@/assets/user.png'
import fints from '@/assets/fints.png'
import { Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Message from '../message/Message'
import { CircularProgress, TextField } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { FormatDate } from '@/utility/FormatDate'
import Loading from '../loading/Loading'

const Chat = ({type, userChatId, getChatUsers}) =>
{
    return(
    <Suspense fallback={<>Loading...</>}>
        <SuspenseChat type={type} userChatId={userChatId} getChatUsers={getChatUsers}/>
    </Suspense>
    )
}

const SuspenseChat = ({type, userChatId, getChatUsers}) =>
{
    const [ chat, setChat ] = useState(null);
    const [ message, setMessage ] = useState('');
    const { data } = useSession();
    const [ isLoading, setIsLoading ] = useState(false);
    const searchParams = useSearchParams();
    const chatId = type === 'user' ? userChatId  : searchParams.get('chatId');
    const username = searchParams.get('username')
    const receiverId = searchParams.get('userId');

    const getChat = async () =>
    {
        setIsLoading(true)

        try
        {
            const url = `/api/chat/${chatId}`;
            const response = await axios.get(url); 
            setChat(response.data);
            
            if(type==='admin')
                getChatUsers()
            
            setIsLoading(false);
        }
        catch(error)
        {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(()=>
    {
        getChat();
    },[chatId])

    const handleSend = async () =>
    {
        let url = null;
        if(type === "admin")
            url = `/api/message/${data.user.id}/${receiverId}/${chatId}`
        else
            url = `/api/message/${data.user.id}/${process.env.NEXT_PUBLIC_adminId}/${chatId}`
        
        try
        {
            await axios.post(url, {text : message})
            setMessage('');
            getChat();
        }
        catch(error)
        {   
            console.log(error)
        }
    }

    return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <Image className={styles.admin} src={userIcon} alt='user'/>
                    {type === "admin" ?
                    (username && <div className={styles.title}>{username}</div>) :
                    <Image className={styles.fints} src={fints} alt='fints'/>}
                </div>
                
                {!isLoading ? 
                (chat?
                <div className={styles.messages}>
                    {chat.messages.map((msg,index) =>
                    {
                        const prevMessageDate = index > 0 ? new Date(chat.message[index-1].createdAt).getDate() : new Date(msg.createdAt).getDate() - 1 ;
                        const currentDate = new Date(msg.createdAt).getDate();
                        const difference = currentDate - prevMessageDate;
    
                        return (
                        <div className={styles.messageWrapper}>
                            {difference >=1 && 
                            <div className={styles.dateWrapper}>
                                <p className={styles.chatDate}>{FormatDate(msg.createdAt).split(',')[0]}</p>
                            </div>
                            }
                            <div className={data.user.id === msg.receiver ? `${styles.message} ${styles.left}` : `${styles.message} ${styles.right}`} key={msg._id}>
                                <Message message={msg.text} time={msg.createdAt}/>
                            </div>
                        </div>)
                    })}
                </div> : <></>):
                <div className={styles.spinner}>
                    <CircularProgress sx={{color: '#D4313D'}} />
                </div>}

                <div className={styles.footer}>
                    <TextField className={styles.box} size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Type a message'/>
                    <button className={styles.send} onClick={handleSend}>Send</button>
                </div>
            </div>
    )
}

export default Chat