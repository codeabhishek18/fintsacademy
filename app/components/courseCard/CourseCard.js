import { useScheme } from '@/contextapi/SchemeProvider';
import styles from './styles.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CourseCard = ({type, course}) =>
{
    const router = useRouter();
    const { scheme } = useScheme();

    return(
        <div className={scheme === 'dark' ? styles.container : `${styles.container} ${styles.light}`}>
            <div className={styles.courseImage}>
                <Image className={styles.image} src={course.imageURL} alt={course.id} layout="fill"/>
            </div>
            <div className={styles.courseContent}>
                <p className={styles.title}>{course.title}</p> 
                <p className={styles.level}>{course.level}</p> 
                <div className={styles.price}>
                    <span className={styles.regularprice}>${course.price}</span>
                    <span className={styles.offerprice}>${course.offerPrice}</span>
                </div>
                <span className={styles.discount}>{Math.floor((course.price - course.offerPrice)*100/course.price)}% off</span>
                <div className={styles.footer}>
                    <p className={styles.lecture}>4 lectures, 8 hours</p>
                    {type !== 'admin' ? <button className={scheme === 'dark' ? styles.explore : `${styles.explore} ${styles.light}`} onClick={()=> router.push(`/courses/${course.id}`)}>View</button> :
                    <button className={scheme === 'dark' ? styles.explore : `${styles.explore} ${styles.light}`} onClick={()=> router.push(`/admin/courses/${course.id}`)}>View lectures</button>}
                </div>
            </div>
        </div>
    )
}

export default CourseCard