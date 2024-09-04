'use client'

import { useEffect, useState } from 'react'
import styles from './Messages.module.css'
import axios from 'axios';
import ChatUser from '@/app/components/chatUser/ChatUser';
import Chat from '@/app/components/chat/Chat';

const Messages = () =>
{
    const [ adminData, setAdminData ] = useState(null);
    const [ chatId, setChatId ] = useState(null); 
    const [ receiver, setReceiver ] = useState(null); 
    const [ chatUsername, setChatUsername ] = useState(null)
    const [ active, setActive ] = useState(null)

    const getUser = async (user) =>
    {
        const url = `/api/user/${user.id}`
        const response = await axios.get(url);
        setAdminData(response.data);
    }

    useEffect(()=>
    {
        const user = localStorage.getItem('user');
        if(user)
            getUser(JSON.parse(user));
    },[])

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.users}>
                    <div className={styles.searchbar}>
                        <input className={styles.search} placeholder='search'/>
                    </div>
                    {adminData?.chat.map((conversation) =>
                    (
                        <ChatUser
                            setChatId={setChatId} setReceiver={setReceiver} conversation={conversation} 
                            username={conversation.sender === adminData._id ? conversation.receiever : conversation.sender} 
                            time={conversation.updatedAt} setChatUsername={setChatUsername}
                            active={active} setActive={setActive}/>
                    ))}
                </div>
                <div className={styles.chat}>
                    {receiver ? 
                    <Chat type="admin" conversation={chatId} receiver={receiver} chatUsername={chatUsername} /> : 
                    <p className={styles.message}>Select a chat to view messages</p>}
                </div>
            </div>
        </div>
    )
}

export default Messages