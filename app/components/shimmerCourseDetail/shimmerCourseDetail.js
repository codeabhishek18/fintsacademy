import { shimmerCourseData } from '@/utility/shimmerData'
import styles from './styles.module.css'
import ShimmerLectureCard from '../shimmerLectureCard/ShimmerLectureCard'

const ShimmerCourseDetail = () =>
{

    return(
        <div className={styles.container}>
            <div className={`${styles.skeleton} ${styles.coverImage}`}></div>
            <div className={styles.header}>
                <p className={`${styles.skeleton} ${styles.title}`}></p>
                <p className={`${styles.skeleton} ${styles.level}`}></p>
                <div className={styles.content}>
                    <p className={`${styles.skeleton} ${styles.description}`}></p>
                    <p className={`${styles.skeleton} ${styles.description}`}></p>
                    <p className={`${styles.skeleton} ${styles.description}`}></p>
                </div>
            </div>
            <div className={styles.lectures}>
                {shimmerCourseData.map((data)=>
                (
                    <ShimmerLectureCard key={data.id}/>
                ))}
            </div>
            <div className={styles.footer}>
                <p className={`${styles.skeleton} ${styles.join}`}></p>
                <p className={`${styles.skeleton} ${styles.rating}`}></p>
            </div>
        </div>
    )
}

export  default ShimmerCourseDetail