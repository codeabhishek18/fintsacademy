import Image from 'next/image'
import styles from './styles.module.css'
import certificate from '@/assets/fintscertify.png'
import certificatebg from '@/assets/certify-bg.jpg'
import { motion } from 'framer-motion'

const Certificate = () =>
{

    return(
        <div className={styles.container}>   
            <Image className={styles.background} src={certificatebg} alt='fints'/>   
            <Image className={styles.certify} src={certificate} alt='fints'/>
        </div>
    )
}

export default Certificate