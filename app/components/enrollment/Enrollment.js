import { FormatDate } from '@/utility/FormatDate'
import styles from './Enrollment.module.css'

const Enrollment = ({enrollment}) =>
{

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <p className={styles.name}>{enrollment.user.name}</p>
                <p className={styles.email}>{enrollment.user.email}</p>
                {/* <p className={styles.contact}>{enrollment?.phone}</p> */}
            </div>
            {/* <div className={styles.buttons}>
                <button className={styles.button}>Remove</button>
                <button className={styles.button}>Change Batch</button>
            </div> */}
        </div>
    )
}

export default Enrollment