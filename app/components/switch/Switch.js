import { useState } from 'react'
import styles from './Switch.module.css'

const Switch = ({id, status, updateSessionStatus}) =>
{
    const [slide, setSlide] = useState(status)

    const handleClick = async () =>
    {
        setSlide((prev) => prev === 'Upcoming' ? 'Completed' : 'Upcoming');
    }

    return(
        <div className={styles.container} onClick={()=> {handleClick(); updateSessionStatus(id, status)}}>
            <div className={slide === 'Upcoming' ? `${styles.slider} ${styles.left}` : `${styles.slider} ${styles.right}`}></div>
        </div>
    )
}

export default Switch