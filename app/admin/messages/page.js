'use client'

import { useEffect, useState } from 'react'
import styles from './Messages.module.css'
import axios from 'axios';
import ChatUser from '@/app/components/chatUser/ChatUser';
import Chat from '@/app/components/chat/Chat';
import { useSession } from 'next-auth/react';
import { CircularProgress } from '@mui/material';
import { toast } from 'sonner';
import Loading from '@/app/components/loading/Loading';
// import deleteIcon from '@/assets/delete.png'
// import clearIcon from '@/assets/clear.png'
// import selectIcon from '@/assets/select.png'
// import closeIcon from '@/assets/close.png'
// import Image from 'next/image';

const Messages = () =>
{
    const [ adminData, setAdminData ] = useState(null);
    const [ showDelete, setShowDelete ] = useState(false);
    const [ isLoading, setIsLoading ] =  useState(false);
    const [ deleteUsers, setDeleteUsers ] = useState(null);
    const [ active, setActive ] = useState(null)
    const { data, status } = useSession();

    const getChatUsers = async () =>
    {
        try
        {
            setIsLoading(true);    
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            setAdminData(response.data);
            setIsLoading(false);  
        }
        catch(error)
        {
            setIsLoading(false);  
            toast.error(error.message);
        }
    }

    useEffect(()=>
    {
        status === 'authenticated' && getChatUsers(data.user.id);
    },[status]);

    const handleDelete = (user) =>
    {
        let users = deleteUsers
        const checkUser = deleteUsers?.find((id) => id === user);
        if(checkUser)
            users = deleteUsers?.filter((id) => id !== user);
        else
            users = deleteUsers ? [...deleteUsers, user] : [user];

        setDeleteUsers(users);
    }

    return(
        <div className={styles.wrapper}>
            {isLoading ? 
            <Loading/> :
            (adminData ? <div className={styles.container}>

                {/* <div className={styles.control}>
                    <Image className={styles.icon} src={selectIcon} alt='icon' onClick={()=> setShowDelete(true)}/>
                    <Image className={styles.icon} src={deleteIcon} alt='icon'/>
                    <Image className={styles.icon} src={clearIcon} alt='icon'/>
                    <Image className={styles.icon} src={closeIcon} alt='icon' onClick={()=> {setShowDelete(false); setDeleteUsers(null)}}/>
                </div> */}

                
                <div className={styles.users}>
                {adminData?.chat?.map((conversation) =>
                (
                    <ChatUser conversation={conversation} active={active} setActive={setActive} handleDelete={handleDelete} deleteUsers={deleteUsers} showDelete={showDelete}/>
                ))}
                </div>
                <div className={styles.chat}>
                    {active ? 
                    <Chat type="admin" getChatUsers={getChatUsers}/> : 
                    <p className={styles.message}>Select a chat to view messages</p>}
                </div>
            </div>: <div className={styles.noMessages}>No Messages</div>)}
        </div>
    )
}

export default Messages