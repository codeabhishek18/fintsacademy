import Image from 'next/image'
import styles from './styles.module.css' 
import fints from '@/assets/fints.png'
import HamburgerMenu from '../hamburgerMenu/HamburgerMenu'
import SlidingMenu from '../slidingMenu/SlidingMenu'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Switch from '../themeSwitch/Switch'
import { useRouter } from 'next/navigation'

const Navbar = ({handleScroll}) =>
{

    const [ showSlider, setShowSlider ] = useState(false);
    const router = useRouter();

    return(
        <div className={styles.container}>
            <motion.div className={styles.fints}>
                <Image className={styles.fints} src={fints} alt='fints'/>
            </motion.div>
            <div className={styles.navigation}>
                
                <div className={styles.links}>
                    <p className={styles.link} onClick={()=> handleScroll('course')}>Courses</p>
                    <p className={styles.link} onClick={()=> handleScroll('about')}>About us</p>
                    <p className={styles.link} onClick={()=> handleScroll('faq')}>FAQ</p>      
                </div>
                <div className={styles.authWrapper}>
                    <button className={styles.auth} onClick={()=> router.push('/login')}>Login</button>
                    <button className={styles.auth} onClick={()=> router.push('/signup')}>Sign up</button>
                </div>  
                <HamburgerMenu setShowSlider={setShowSlider}/>
                {/* <Switch/> */}
            </div>
            {showSlider && 
            <div className={styles.slider}>
                <SlidingMenu setShowSlider={setShowSlider} handleScroll={handleScroll}/>
            </div>}
        </div>
    )
}

export default Navbar