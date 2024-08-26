import styles from './styles.module.css'

const ShimmerCourseCard = () =>
{
    return(
        <div className={styles.container}>
            <div className={styles.courseImage}>
            </div>
            <div className={styles.courseContent}>
                <p className={styles.title}></p> 
                <p className={styles.level}></p> 
                <div className={styles.price}>
                    <span className={styles.regularprice}></span>
                    <span className={styles.offerprice}></span>
                    <span className={styles.discount}></span>
                </div>
                <div className={styles.footer}>
                    <p className={styles.lecture}></p>
                    <button className={styles.explore}></button>
                </div>
            </div>
        </div>
    )
}

export default ShimmerCourseCard