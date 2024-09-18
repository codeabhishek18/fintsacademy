'use client'

import Image from 'next/image'
import styles from './styles.module.css' 
import fints from '@/assets/fints.png'
import HamburgerMenu from '../hamburgerMenu/HamburgerMenu'
import SlidingMenu from '../slidingMenu/SlidingMenu'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import logout from '@/assets/logout.png'
import close from '@/assets/close.png'
import { CircularProgress } from '@mui/material'
import Logout from '../logout/Logout'

const Navbar = () =>
{
    const [ showSlider, setShowSlider ] = useState(false);
    const [ isUser, setIsUser ] = useState(false);
    const session = useSession();
    const { data, status } = useSession();
    const router = useRouter();
    const [ showDetails, setShowDetails ] = useState(false)

    useEffect(()=>
    {
        console.log('load')
        session.update();
    },[])

    return(
        <div className={styles.container}>
            <div className={styles.fints}>
                <Image className={styles.fints} src={fints} alt='fints' onClick={()=> router.push('/')}/>
            </div>
            
            
            <div className={styles.navigation}>
                <div className={styles.links}>
                    {/* {data?.user && 
                    <div>
                        <Image className={styles.profile} src={logout} alt='profile' onClick={()=> setShowDetails(true)}/>
                    </div>} */}
                    {data?.user && 
                    <p className={styles.link} onClick={()=> router.push('/dashboard')}>Dashboard</p>}
                    <p className={styles.link} onClick={()=> router.push('/courses')}>Courses</p>
                    {/* <p className={styles.link} onClick={()=> router.push('/blogs')}>Blogs</p>   */}
                    <p className={styles.link} onClick={()=> router.push('/about')}>About</p>
                </div>
                {!data?.user && <div className={styles.authWrapper}>
                    <button className={styles.auth} onClick={()=> router.push('/login')}>Login</button>
                    {/* <button className={styles.auth} onClick={()=> router.push('/signup')}>Sign up</button> */}
                </div>  }
                <HamburgerMenu setShowSlider={setShowSlider}/>
                {/* <Switch/> */}
            </div>

            {/* {showDetails && 
            <div className={styles.user}>
                <Image className={styles.close} src={close} alt='close' onClick={()=> setShowDetails(false)}/>
                <p className={styles.name}>{data.user.email}</p>
                <p className={styles.name}>{data.user.name}</p>
                <Logout/>
            </div>} */}
            {showSlider && 
            <div className={styles.slider}>
                <SlidingMenu setShowSlider={setShowSlider} />
            </div>}
        </div>
    )
}

export default Navbar


// import { signIn, useSession } from "next-auth/react";
// import Link from "next/link";
// import Logout from '../logout/Logout';

// export default function NavBar() {
//   const session = useSession();
//   const user = session.data?.user;

//   return (
//     <div className={styles.container}>
//         <div className={styles.fints}>
//             <Image className={styles.fints} src={fints} alt='fints' onClick={()=> router.push('/')}/>
//         </div>
//       {user && 
//       <div className={styles.navigation}>
//         <p className={styles.link}>Dashboard</p>
//         <Logout/>
//       </div>}
//       {!user && session.status !== "loading" && <SignInButton />}
//     </div>
//   );
// }

// function SignInButton() {
//   return <button onClick={() => signIn()}>Sign in</button>;
// }