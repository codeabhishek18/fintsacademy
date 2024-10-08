'use client'

import styles from './Header.module.css'
import logout from '@/assets/logout.png'
import fints from '@/assets/fints.png'
import close from '@/assets/close.png'
import Image from 'next/image';
import { useSession } from "next-auth/react"
import { doLogout } from '@/app/action';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Logout from '../logout/Logout'

const Header = () =>
{
    const router= useRouter();
    const { data, status } = useSession();
    const [ showDetails, setShowDetails ] = useState(false)

    return(
        <div className={styles.container}>
            <Image className={styles.title} src={fints} alt='logo' onClick={()=> router.push('/')}/>
            
            <div className={styles.links}>
                {(data?.user?.role === 'user' || data?.user?.role === 'admin') && <p className={styles.link} onClick={()=> router.push('/dashboard')}>Dashboard</p>}
                <p className={styles.link} onClick={()=> router.push('/courses')}>Courses</p>
                {/* <p className={styles.link} onClick={()=> router.push('/blogs')}>Blogs</p>   */}
                <p className={styles.link} onClick={()=> router.push('/about')}>About</p>
                {data?.user && <Image className={styles.profile} src={logout} alt='profile' onClick={()=> setShowDetails(true)}/>}
            </div>
          
            {showDetails && 
            <div className={styles.user}>
                <Image className={styles.close} src={close} alt='close' onClick={()=> setShowDetails(false)}/>
                <p className={styles.name}>{data.user.email}</p>
                <p className={styles.name}>{data.user.name}</p>
                <Logout/>
            </div>}
        </div>
    )
}

export default Header
