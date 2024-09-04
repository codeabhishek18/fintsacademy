'use client'

import styles from './Header.module.css'
import userIcon from '@/assets/user.png'
import fints from '@/assets/fints.png'
import Image from 'next/image';
import { useSession } from "next-auth/react"
import { doLogout } from '@/app/action';

const Header = () =>
{
    const { data } = useSession();

    return(
        <div className={styles.container}>
            <Image className={styles.title} src={fints} alt='logo'/>
             
            <div className={styles.user}>
                <Image className={styles.profile} src={userIcon} alt='profile'/>
                <p className={styles.username}>{data?.user?.name?.split(' ')[0]}</p>
                <p className={styles.logout} onClick={doLogout}>Logout</p>
            </div> 
        </div>
    )
}

export default Header
