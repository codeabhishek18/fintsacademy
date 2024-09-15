'use client'

import Image from 'next/image'
import styles from './styles.module.css' 
import fints from '@/assets/fints.png'
import HamburgerMenu from '../hamburgerMenu/HamburgerMenu'
import SlidingMenu from '../slidingMenu/SlidingMenu'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Navbar = () =>
{
    const [ showSlider, setShowSlider ] = useState(false);
    const [ isUser, setIsUser ] = useState(false);
    const { data, status } = useSession();
    const router = useRouter();

    useEffect(()=>
    { 
        if(data?.user?.role === 'user' || data?.user?.role === 'admin')
            setIsUser(true);
    },[status === 'authenticated'])

    console.log(data?.user?.role)

    return(
        <div className={styles.container}>
            <div className={styles.fints}>
                <Image className={styles.fints} src={fints} alt='fints' onClick={()=> router.push('/')}/>
            </div>
            
            
            <div className={styles.navigation}>
                <div className={styles.links}>
                    {isUser && <p className={styles.link} onClick={()=> router.push('/dashboard')}>Dashboard</p>}
                    <p className={styles.link} onClick={()=> router.push('/courses')}>Courses</p>
                    {/* <p className={styles.link} onClick={()=> router.push('/blogs')}>Blogs</p>   */}
                    <p className={styles.link} onClick={()=> router.push('/about')}>About</p>
                </div>
                {!data?.user && <div className={styles.authWrapper}>
                    <button className={styles.auth} onClick={()=> router.push('/login')}>Login</button>
                    <button className={styles.auth} onClick={()=> router.push('/signup')}>Sign up</button>
                </div>  }
                <HamburgerMenu setShowSlider={setShowSlider}/>
                {/* <Switch/> */}
            </div>
            {showSlider && 
            <div className={styles.slider}>
                <SlidingMenu setShowSlider={setShowSlider} />
            </div>}
        </div>
    )
}

export default Navbar