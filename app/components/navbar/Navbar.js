'use client'

import Image from 'next/image'
import styles from './styles.module.css' 
import fints from '@/assets/fints.png'
import HamburgerMenu from '../hamburgerMenu/HamburgerMenu'
import SlidingMenu from '../slidingMenu/SlidingMenu'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import close from '@/assets/close.png'
import logout from '@/assets/logout.png'
import cart from '@/assets/cart.png'
import { CircularProgress } from '@mui/material'
import Logout from '../logout/Logout'
import Link from 'next/link'

const Navbar = () =>
{
    const [ showSlider, setShowSlider ] = useState(false);
    const [ cartItem, setCartItem ] = useState(0);
    const { data, status } = useSession();
    const router = useRouter();
    const [ showDetails, setShowDetails ] = useState(false)

    useEffect(()=>
    {
        const course = localStorage.getItem('selectedCourse');
        if(course)
            setCartItem(1)
    },[])

    return(
        <div className={styles.container}>
            <div className={styles.fints}>
                <Image className={styles.fints} src={fints} alt='fints' onClick={()=> router.push('/')}/>
            </div>
            
            
            <div className={styles.navigation}>
                <div className={styles.links}>
                    {(data?.user?.role === 'user' || data?.user?.role === 'admin') && status !== 'loading' &&
                    <Link className={styles.link} href='/dashboard'>Dashboard</Link>}
                    <Link className={styles.link} href='/courses'>Courses</Link>
                    <Link className={styles.link} href='/about'>About</Link>
                    {status === 'authenticated' &&
                    <div className={styles.cartWrapper}>
                        <Image className={styles.cart} src={cart} alt='icon' onClick={()=> router.push('/checkout')}/>
                       <p className={styles.count}>{cartItem}</p>
                    </div>}
                    {status === 'authenticated' && <Image className={styles.cart} src={logout} alt='icon' onClick={()=> setShowDetails(true)}/>}
                </div>
                {!data?.user && status !== 'loading' && 
                <div className={styles.authWrapper}>
                    <Link className={styles.auth} href='/login'>Login</Link>
                    <Link className={styles.auth} href='/signup'>Signup</Link>
                </div>}
                <HamburgerMenu setShowSlider={setShowSlider}/>
                {/* <Switch/> */}
            </div>

            {showDetails && 
            <div className={styles.user}>
                <Image className={styles.close} src={close} alt='close' onClick={()=> setShowDetails(false)}/>
                <p className={styles.name}>{data.user.email}</p>
                <p className={styles.name}>{data.user.name}</p>
                <Logout/>
            </div>}
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