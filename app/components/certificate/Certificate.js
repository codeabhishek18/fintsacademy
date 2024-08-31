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
            <motion.div 
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                className={styles.certify}>
                <Image className={styles.certify} src={certificate} alt='fints'/>
            </motion.div>
        </div>
    )
}

export default Certificate