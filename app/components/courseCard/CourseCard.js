import styles from './styles.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '../button/Button';

const CourseCard = ({type, course}) =>
{
    const router = useRouter();

    return(
        <div className={styles.container}>
            <div className={styles.courseImage}>
                <Image className={styles.image} src={course.imageURL} alt={course.id} layout="fill"/>
            </div>
            <div className={styles.courseContent}>
                <p className={styles.title}>{course.title}</p> 
                <p className={styles.level}>{course.level}</p> 
                <div className={styles.price}>
                    <span className={styles.offerprice}>${course.offerPrice}</span>
                    <span className={styles.regularprice}>${course.price}</span>
                </div>
                <span className={styles.discount}>{Math.floor((course.price - course.offerPrice)*100/course.price)}% off</span>
                <div className={styles.footer}>
                    <p className={styles.lecture}>{`${course.lectures.length} lectures, ${course.lectures.length * 2} hours`}</p>
                    {type !== 'admin' ? 
                    <Button size='small' label='View' action={()=> router.push(`/courses/${course.id}`)}/> :
                    <Button size='small' label='View lectures' action={()=> router.push(`/admin/courses/${course.id}`)}/>}
                </div>
            </div>
        </div>
    )
}

export default CourseCard