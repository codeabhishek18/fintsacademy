import { usePathname, useRouter } from 'next/navigation';
import styles from './GroupCard.module.css'
import { FormatDate } from '@/utility/FormatDate';

const GroupCard = ({data}) =>
{
    const pathname = usePathname();
    const router = useRouter();
    console.log(data);

    return(
        <div className={styles.container}>
            <p className={styles.title}>{data.batch.course.title}</p>

            <div className={styles.content}>
                <p className={styles.quiz}>{data.batch.title}</p>
                <p className={styles.quiz}>Strength : {data.batch.enrollments.length}</p>
                <p className={styles.quiz}>Participants : {data.assignment.length}</p>
            </div>
            
            <div className={styles.footer}>
                <p className={styles.date}>{FormatDate(data.batch.startDate)}</p>
                <button className={styles.post} onClick={()=>router.push(`${pathname}/${data._id}`)}>View scores</button>
            </div>
        </div>
    )
}

export default GroupCard