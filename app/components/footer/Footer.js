import styles from './styles.module.css'
import email from '@/assets/email.png'
import linkedin from '@/assets/linkedin.png'
import instagram from '@/assets/instagram.png'
import fints from '@/assets/fints.png'
import youtube from '@/assets/youtube.png'
import Image from 'next/image'

const Footer = () =>
{

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
            <Image className={styles.title} src={fints} alt='icon'/>
            <div className={styles.social}>
                <a href='https://www.linkedin.com/in/lokesh-naik-amltrustedsource/' target='_blank'>
                    <Image className={styles.icons} src={linkedin} alt='linkedin'/>
                </a>
                <a href='https://www.youtube.com/@camsbuild_lokesh' target='_blank'>
                    <Image className={styles.icons} src={youtube} alt='youtube'/>
                </a>   
            </div>
            <div className={styles.contact}>
                <Image className={styles.icons} src={email} alt='icon'/>
                <p className={styles.description}>admin@fintsacademy.com</p>
            </div>
            </div>
            <p className={styles.copyright}>© 2024 FinCrime Trusted Source. All rights reserved.</p>
        </div>
    )
}

export default Footer
