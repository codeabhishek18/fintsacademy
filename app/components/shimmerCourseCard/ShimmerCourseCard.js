import styles from './styles.module.css'

const ShimmerCourseCard = () =>
{
    return(
        <div className={styles.container}>
            <div className={`${styles.skeleton} ${styles.courseImage}`}>
            </div>
            <div className={styles.courseContent}>
                <p className={`${styles.skeleton} ${styles.title}`}></p> 
                <p className={`${styles.skeleton} ${styles.level}`}></p> 
                <p className={`${styles.skeleton} ${styles.price}`}></p> 
                <div className={styles.footer}>
                    <p className={`${styles.skeleton} ${styles.lecture}`}></p>
                    <button className={`${styles.skeleton} ${styles.explore}`}></button>
                </div>
            </div>
        </div>
    )
}

export default ShimmerCourseCard