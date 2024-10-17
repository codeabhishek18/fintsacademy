import Image from 'next/image'
import styles from './styles.module.css'
import close from '@/assets/close.png'
import { useRouter } from 'next/navigation'
import Logout from '../logout/Logout'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import cart from '@/assets/cart.png'
import { useEffect, useState } from 'react'

const SlidingMenu= ({setShowSlider}) =>
{
    const router = useRouter();
    const {data, status} = useSession();
    const [ cartItem, setCartItem ] = useState(0);

    useEffect(()=>
    {
        const course = localStorage.getItem('selectedCourse');
        if(course)
            setCartItem(1)
    },[])

    return(
        <div className={styles.container}>

            <div className={styles.header}>
                {status === 'authenticated' &&
                <div className={styles.cartWrapper}>
                    <Image className={styles.cart} src={cart} alt='icon' onClick={()=> router.push('/checkout')}/>
                    <p className={styles.count}>{cartItem}</p>
                </div>}
                {status === 'unauthenticated' &&  
                <div className={styles.authWrapper}>
                    <Link className={styles.auth} href='/login'>Login</Link>
                    <Link className={styles.auth} href='/signup'>Signup</Link>
                </div>}
                <Image className={styles.close} src={close} alt='close' onClick={()=> setShowSlider(false)}/>
            </div>

            {(data?.user?.role === 'user' || data?.user?.role === 'admin') && status !== 'loading' &&
            <Link className={styles.link} href='/dashboard'>Dashboard</Link>}
            <Link className={styles.link} href='/courses'>Courses</Link>
            <Link className={styles.link} href='/about'>About</Link>

            {status === 'authenticated' && <Logout/>}

        </div>
    )
}

export default SlidingMenu