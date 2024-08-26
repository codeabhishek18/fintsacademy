import Image from 'next/image'
import styles from './styles.module.css'
import close from '@/assets/close.png'

const SlidingMenu= ({setShowSlider, handleScroll}) =>
{
    return(
        <div className={styles.container}>
            <p className={styles.link} onClick={()=> {handleScroll('course'); setShowSlider(false)}}>Courses</p>
            <p className={styles.link} onClick={()=> {handleScroll('about'); setShowSlider(false)}}>About us</p>
            <p className={styles.link} onClick={()=> {handleScroll('faq');  setShowSlider(false)}}>FAQ</p>
            <Image className={styles.close} src={close} alt='close' onClick={()=> setShowSlider(false)}/>
        </div>
    )
}

export default SlidingMenu