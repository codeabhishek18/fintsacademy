'use client'

import { useEffect, useState } from 'react'
import styles from './ChatUser.module.css'
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formatChatTime } from '@/utility/formatChatTime';

const ChatUser = ({conversation, active, setActive, deleteUsers, handleDelete, showDelete}) =>
{
    const { data } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const receiverId = searchParams.get('userId');
    
    const user = conversation.sender._id === data.user.id ? conversation.receiever : conversation.sender;
    
    useEffect(()=>
    {   
        setActive(receiverId)
    },[])

    const handleClick = () =>
    {
        setActive(user._id)
        router.push(pathname +'?chatId=' +conversation._id +'&&username=' +user.name  +'&&userId=' +user._id)
    } 

    return(
        <div className={styles.user} onClick={()=> handleDelete(user._id)}>
            {showDelete && <div className={styles.delete}>
                {deleteUsers && <p className={deleteUsers.includes(user._id) ? styles.activeDelete : styles.inactiveDelete}></p>}
            </div>}
            
            {conversation && 
            <div className={user._id === active ? `${styles.container} ${styles.active}` : styles.container} onClick={handleClick}>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.time}>{formatChatTime(conversation.updatedAt)}</p>
            </div>}
        </div>
    )
}

export default ChatUser