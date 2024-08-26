import { shimmerCourseData } from '@/utility/shimmerData'
import styles from './styles.module.css'
import ShimmerLectureCard from '../shimmerLectureCard/ShimmerLectureCard'

const ShimmerCourseDetail = () =>
{

    return(
        <div className={styles.container}>
            <div className={styles.coverImage}></div>
            <div className={styles.header}>
                <p className={styles.title}></p>
                <div className={styles.content}>
                    <p className={styles.description}></p>
                    <p className={styles.description}></p>
                    <p className={styles.description}></p>
                </div>
            </div>
            <div className={styles.lectures}>
                {shimmerCourseData.map((data)=>
                (
                    <ShimmerLectureCard key={data.id}/>
                ))}
            </div>
            <div className={styles.footer}>
                <p className={styles.join}></p>
                <p className={styles.rating}></p>
            </div>
        </div>
    )
}

export  default ShimmerCourseDetail