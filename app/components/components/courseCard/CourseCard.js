import styles from './CourseCard.module.css'
import deleteIcon from '../../assets/delete.png' 
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import next from '../../assets/next.png'

const CourseCard = ({type, course}) =>
{
    const router = useRouter();

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}>{course.title}</p>
                {type === "admin" && 
                    <Image className={styles.deleteIcon} 
                    src={deleteIcon} alt='delete' 
                    onClick={()=> removeCourse(course._id)}
                />}
            </div>
            {type === "admin" && <p className={styles.moduleCount}>Modules : {course.modules.length}</p>}
            <div className={styles.footer}>
                <Image className={styles.next} src={next} alt='next' onClick={()=> router.push(`/course/${course._id}`)}/>
                {type === "admin" && <button className={styles.buttons} onClick={()=> router.push(`/admin/courses/${course._id}`)}>Modules</button>}
             </div>
        </div>
    )
}

export default CourseCard