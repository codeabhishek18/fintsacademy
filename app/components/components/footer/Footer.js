import footer from './Footer.module.css'
import email from '../../assets/email.png'
import linkedin from '../../assets/linkedin.png'
import instagram from '../../assets/instagram.png'
import fints from '../../assets/fints.png'
import youtube from '../../assets/youtube.png'
import Image from 'next/image'

const Footer = () =>
{

    return(
        <div className={footer.container}>
            <Image className={footer.title} src={fints} alt='icon'/>
            <div className={footer.details}>
                <div className={footer.contact}>
                    <Image className={footer.icons} src={email} alt='icon'/>
                    <p className={footer.description}>admin@fintsacademy.com</p>
                </div>
                <div className={footer.policies}>
                    <span>About</span>
                    <span>Privacy Policy</span>
                    <span>Cookie Policy</span>
                </div>
                <div className={footer.social}>
                    <Image className={footer.icons} src={linkedin} alt='icon'/>
                    <Image className={footer.icons} src={youtube} alt='icon'/>
                    <Image className={footer.icons} src={instagram} alt='icon'/>
                </div>
            </div>
        </div>
    )
}

export default Footer
