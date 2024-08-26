'use client'

import { header } from '@/utility/header'
import styles from './styles.module.css'
import compliance from '@/assets/compliance.jpg'
import Image from 'next/image'
import Navbar from '../navbar/Navbar'

const HeroSection = ({handleScroll}) =>
{

    return(
        <div className={styles.container}>
            <Navbar handleScroll={handleScroll}/>
            <Image className={styles.heroImage} src={compliance} alt='FINTS - FinCrime Trusted Source' priority={true} />

            <div className={styles.content}>
                <div className={styles.header}>
                    <p className={styles.heading}>{header.heading1}</p>
                    <p className={styles.activeHeading}>{header.heading2}</p>
                    <p className={styles.heading}>{header.heading3}</p>
                </div>
                <div className={styles.footer}>
                    <p className={styles.subHeading}>{header.subHeading}</p>
                    <a href='https://wa.me/8431976788' target='_blank' className={styles.enrollWrapper}>
                        <span className={styles.enroll}>Get enrolled</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default HeroSection