
import { useScheme } from '@/contextapi/SchemeProvider';
import styles from './styles.module.css'

const Switch = () =>
{
    const { scheme, updateScheme } = useScheme();

    return(
        <div className={styles.container} onClick={updateScheme}>
            <div className={scheme === 'light' ? `${styles.slider} ${styles.right}` : `${styles.slider} ${styles.left}`}></div>
        </div>
    )
}

export default Switch