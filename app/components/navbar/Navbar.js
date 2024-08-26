import Image from 'next/image'
import styles from './styles.module.css' 
import fints from '@/assets/fints.png'
import HamburgerMenu from '../hamburgerMenu/HamburgerMenu'
import SlidingMenu from '../slidingMenu/SlidingMenu'
import { useState } from 'react'
import Switch from '../switch/Switch'

const Navbar = ({handleScroll}) =>
{

    const [ showSlider, setShowSlider ] = useState(false);

    return(
        <div className={styles.container}>
            <Image className={styles.fints} src={fints} alt='fints'/>
            <div className={styles.navigation}>
                
                <div className={styles.links}>
                    <p className={styles.link} onClick={()=> handleScroll('course')}>Courses</p>
                    <p className={styles.link} onClick={()=> handleScroll('about')}>About us</p>
                    <p className={styles.link} onClick={()=> handleScroll('faq')}>FAQ</p>      
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