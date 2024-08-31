import styles from './Enrollment.module.css'

const Enrollment = ({student}) =>
{

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <p className={styles.name}>{student.firstname +' ' +student.lastname}</p>
                <p className={styles.email}>{student.email}</p>
                <p className={styles.contact}>{student.contactNumber}</p>
            </div>
            <div className={styles.buttons}>
                <button className={styles.button}>Remove</button>
                <button className={styles.button}>Change Batch</button>
            </div>
        </div>
    )
}

export default Enrollment