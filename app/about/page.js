import Footer from '../components/footer/Footer'
import Founder from '../components/founder/Founder'
import Header from '../components/header/Header'
import Navbar from '../components/navbar/Navbar'
import styles from './styles.module.css'

const AboutUs = () =>
{
    return(
        <div className={styles.wrapper}>
            <Header/>
            <div className={styles.container}>
                <Founder/>
                <div className={styles.video}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/9vk8LJsVE9I?si=yeTdC34yB273urin" title="Fints Academy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </div>
            <Footer/>
        </div>
    )
} 

export default AboutUs