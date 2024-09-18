'use client'

import { header } from '@/utility/header'
import { motion } from 'framer-motion'
import styles from './styles.module.css'
import compliance from '@/assets/compliance.jpg'
import Image from 'next/image'
import Navbar from '../navbar/Navbar'
import { useSession } from 'next-auth/react'

const fadeInAnimation = 
{
    hidden:
    {
        opacity: 0,
        y: 300
    },
    show:
    {
        opacity:1,
        y: 0,
        transition:
        {
            duration: 0.75
        }
    }
}

const HeroSection = () =>
{

    const session = useSession();

    return(
        <div className={styles.container}>
            <Navbar/>
            <Image className={styles.heroImage} src={compliance} alt='FINTS - FinCrime Trusted Source' priority={true} />

            <div className={styles.content}>
                <div className={styles.header}>
                    <motion.p 
                        initial="hidden"
                        animate="show"
                        variants={fadeInAnimation}
                        className={styles.heading}>{header.heading1}
                    </motion.p>
                    <motion.p 
                        initial="hidden"
                        animate="show"
                        variants={fadeInAnimation}
                        className={styles.activeHeading}>{header.heading2}
                    </motion.p>
                    <motion.p 
                        initial="hidden"
                        animate="show"
                        variants={fadeInAnimation}
                        className={styles.heading}>{header.heading3}
                    </motion.p>
                </div>
                <motion.div  
                    initial="hidden"
                    animate="show"
                    variants={fadeInAnimation}
                    className={styles.footer}>
                    <p className={styles.subHeading}>{header.subHeading}</p>
                    <a href='https://wa.me/8431976788' target='_blank' className={styles.enrollWrapper}>
                        <span className={styles.enroll}>Get enrolled</span>
                    </a>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection