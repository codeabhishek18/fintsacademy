import styles from './styles.module.css'

const ShimmerLectureCard = () =>
{

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={`${styles.skeleton} ${styles.title}`}></p>
                <p className={`${styles.skeleton} ${styles.duration}`}></p>
            </div>
            <div className={styles.footer}>
                <p className={`${styles.skeleton} ${styles.description}`}></p>
                <p className={`${styles.skeleton} ${styles.description}`}></p>
            </div>
        </div>
    )
}

export default ShimmerLectureCard