import styles from './styles.module.css'

const ShimmerLectureCard = () =>
{

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}></p>
                <p className={styles.duration}></p>
            </div>
            <div className={styles.footer}>
                <p className={styles.description}></p>
                <p className={styles.description}></p>
            </div>
        </div>
    )
}

export default ShimmerLectureCard