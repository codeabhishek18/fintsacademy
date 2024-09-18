import Image from 'next/image'
import styles from './styles.module.css'
import close from '@/assets/close.png'
import { useRouter } from 'next/navigation'
import Logout from '../logout/Logout'

const SlidingMenu= ({setShowSlider}) =>
{
    const router = useRouter();

    return(
        <div className={styles.container}>
            <p className={styles.link} onClick={()=> {router.push('/courses'); setShowSlider(false)}}>Courses</p>
            {/* <p className={styles.link} onClick={()=> router.push('/login')}>Login</p>
            <p className={styles.link} onClick={()=> router.push('/signup')}>Sign up</p> */}
            <p className={styles.link} onClick={()=> {router.push('/about'); setShowSlider(false)}}>About</p>
            {/* <Logout/> */}
            {/* <p className={styles.link} onClick={()=> {handleScroll('faq');  setShowSlider(false)}}>FAQ</p> */}
            <Image className={styles.close} src={close} alt='close' onClick={()=> setShowSlider(false)}/>
        </div>
    )
}

export default SlidingMenu