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
            </div>
            <Footer/>
        </div>
    )
} 

export default AboutUs