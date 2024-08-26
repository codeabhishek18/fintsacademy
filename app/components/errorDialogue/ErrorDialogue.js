import Image from 'next/image'
import styles from './styles.module.css'
import close from '@/assets/close.png'
import { useRouter } from 'next/navigation'
import { useScheme } from '@/contextapi/SchemeProvider'

const ErrorDialogue = ({setError, type}) =>
{
    const router = useRouter();
    const  { scheme } = useScheme();

    return(
        <div className={styles.container}>
            <div className={styles.error}>
                <p className={styles.errorMMessage}>Something went wrong! Try again</p>
                {type ==='away' && <button className={scheme === 'dark'? styles.home : `${styles.home} ${styles.light}`} onClick={()=> router.push('/')}>Go to Home</button>}
                {/* <Image className={styles.close} src={close} alt='error' onClick={()=> setError(false)}/> */}
            </div>
        </div>
    )
}

export default ErrorDialogue