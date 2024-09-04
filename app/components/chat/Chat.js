'use client'

import chat from './styles.module.css'
import userIcon from '@/assets/user.png'
import fints from '@/assets/fints.png'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Message from '../message/Message'
import { adminId } from '@/utility/admin'
import { CircularProgress } from '@mui/material'

const Chat = ({ type, receiver, conversation, chatUsername}) =>
{
    const [ message, setMessage ] = useState('')
    const [ currentUser, setCurrentUser ] = useState(null)
    const [ user, setUser ] = useState(null)
    const bottomRef = useRef(null);
    const [ isLoading, setIsLoading ] = useState(false)
    // const [ userCard, setUserCard ] = useState(false)

    useEffect(()=>
    {
        const user = localStorage.getItem('user');
        if(user)
        {
            setCurrentUser(JSON.parse(user));
            getUser(JSON.parse(user));
        }
        scrollToBottom();
    },[])

    const scrollToBottom = () =>
    {
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const getUser = async (user) =>
    {
        const url = `/api/user/${user.id}`
        const response = await axios.get(url);
        setUser(response.data);
        setIsLoading(false)
    }

    const handleSend = async () =>
    {
        let url;
        if(type === "admin")
            url = `/api/message/${currentUser.id}/${receiver}/${conversation}`
        else
        {
            const chatId = user.chat[0]?._id === undefined ? null : user.chat[0]._id;
            url = `/api/message/${currentUser.id}/${adminId}/${chatId}`
        }
        await axios.post(url, {text : message})
        setMessage('')
        scrollToBottom();
        getUser(currentUser);
    }

    const chatUserMessages = type === 'admin' && user?.chat.filter((conv) => conv._id === conversation)

    return(
            <div className={chat.container}>
                {!isLoading ? 
                <div className={chat.header}>
                    <Image className={chat.admin} src={userIcon} alt='user'/>
                    <div className={chat.title}>{type === "admin" ? chatUsername : <Image className={chat.fints} src={fints} alt='fints'/>}</div>
                </div> : 
                <p></p>}

                {!isLoading ?
                (type === 'admin' ?     
                (chatUserMessages.length ? 
                <div className={chat.messages}>
                    {chatUserMessages[0].message.map((msg) =>(
                        <div className={user._id === msg.receiver ? `${chat.message} ${chat.left}` : `${chat.message} ${chat.right}`} key={msg._id}>
                            <Message message={msg.text} time={msg.createdAt}/>
                        </div>))
                    }
                </div>: 
                <p></p>) :
                <div className={chat.messages}>
                    {user?.chat[0]?.message.map((msg) =>
                    (
                        <div className={user._id === msg.receiver ? `${chat.message} ${chat.left}` : `${chat.message} ${chat.right}`} key={msg._id}>
                            <Message message={msg.text} time={msg.createdAt}/>
                        </div>
                    ))}
                    <div ref={bottomRef}></div>
                </div>) : 
                <div className={chat.spinner}>
                    <CircularProgress sx={{color: '#D4313D'}} />
                </div>}

                <div className={chat.footer}>
                    <input className={chat.box} value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Type a message'/>
                    <button className={chat.send} onClick={handleSend}>Send</button>
                </div>
            </div>
    )
}

export default Chat