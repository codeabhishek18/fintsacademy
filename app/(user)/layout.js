'use client'

import styles from './layout.module.css'
import close from '@/assets/close.png'
import chat from '@/assets/chat.png'
import { useState } from 'react'
import Image from 'next/image'
import Header from '../components/header/Header'
import UserPanel from '../components/userPanel/UserPanel'
// import Chat from '@/components/chat/Chat'
// import { Provider } from 'react-redux'
// import { store } from '@/store'

export default function Layout({ children }) 
{
    const [ showChat, setShowChat ] = useState(false)
    

    return(
        <div className={styles.container}>
            <Header/>
            <UserPanel/>
            
            <main className={styles.main}>
                <div className={styles.wrapper}>
                    {children}
                </div>
            </main>

            <Image className={styles.support} src={showChat ? close : chat} alt="chat" onClick={()=> setShowChat(!showChat)}/>
            {showChat && 
            <div className={styles.chatWrapper}>
                <div className={styles.chat}>
                    {/* <Chat type="user"/> */}
                </div>
            </div>}

        </div>
    )
}