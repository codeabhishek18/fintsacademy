import { useEffect, useState } from 'react'
import styles from './ChatUser.module.css'
import axios from 'axios'

const ChatUser = ({conversation, username, time, setChatId, setReceiver, setChatUsername, active, setActive}) =>
{
    const [chatUser, setChatUser] = useState(null)

    const getChatUSer = async () =>
    {
        const url = `/api/user/${username}`
        const user = await axios.get(url);
        setChatUser(user.data)
    }

    useEffect(()=>
    {
        getChatUSer();
    },[])

    const handleClick = () =>
    {
        setChatId(conversation._id); 
        setReceiver(username)
        setChatUsername(chatUser.firstname +' ' +chatUser.lastname)
        setActive(username)
    } 

    return(
        <div className={username === active ? `${styles.container} ${styles.active}` : styles.container} onClick={handleClick}>
            {chatUser && <p className={styles.name}>{chatUser.firstname +' ' +chatUser.lastname}</p>}
            {time && <p className={styles.time}>{new Date(time).getHours()}:{new Date(time).getMinutes()}</p>}
        </div>
    )
}

export default ChatUser