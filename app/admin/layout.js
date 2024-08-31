'use client'

import styles from './layout.module.css'
import Header from '../components/header/Header'
import AdminPanel from '../components/adminPanel/AdminPanel'
import { SessionProvider } from 'next-auth/react'

export default function Layout({ children }) 
{
    return(
        <div className={styles.container}>
            <Header/>
            <AdminPanel/>
            <main className={styles.main}>
                {children}
            </main>          
        </div>
    )
}