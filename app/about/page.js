import HeroVideoDialog from '@/components/ui/hero-video-dialog'
import Footer from '../components/footer/Footer'
import Founder from '../components/founder/Founder'
import Header from '../components/header/Header'
import fints from '@/assets/fints.png'
import Navbar from '../components/navbar/Navbar'
import styles from './styles.module.css'

const AboutUs = () =>
{
    return(
        <div className={styles.wrapper}>
            <Header/>
            <div className={styles.container}>
                <HeroVideoDialog
                className={styles.YTvideo}
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/9vk8LJsVE9I?si=yeTdC34yB273urin"
                thumbnailSrc="https://res.cloudinary.com/dzuaagm1a/image/upload/v1728823741/Screenshot_2024-10-13_181832_zjdjxm.png"
                thumbnailAlt="Hero Video"
                />
                <Founder/>
            </div>
            <Footer/>
        </div>
    )
} 

export default AboutUs