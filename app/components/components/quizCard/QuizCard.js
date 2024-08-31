import { useState } from 'react';
import AssignForm from '../assignForm/AssignForm';
import styles from './Quizcard.module.css'
import { useRouter } from 'next/navigation';
import next from '../../assets/next.png'
import Image from 'next/image';

const QuizCard = ({type, data}) =>
{
    const [ assignForm, setAssignForm ] = useState(false);
    const router = useRouter();

    return(
        <div className={data.status === "Completed" ? `${styles.container} ${styles.success_bg}` : `${styles.container} ${styles.pending_bg}`}>
            <p className={styles.title}>{data.title}</p>
            {type === "admin"  && <p className={styles.quiz}>{data.course.title}</p>}
            {type === "admin"  && <p className={styles.quiz}>Assigned batches : {data.group.length}</p>}
            {type === "admin" && <p className={styles.quiz}>Questions : {data.quiz.length}</p>}
            <div className={styles.buttons}>
                <p className={styles.status}>{data.status}</p>
                {type=== "admin" && <button className={styles.post} onClick={()=>router.push(`/admin/quiz/${data._id}`)}>Batches</button>}
                {type === "admin" ? 
                    <button className={styles.post} onClick={()=>setAssignForm(true)}>Assign</button> :
                    <Image className={styles.next} src={next} alt='next' onClick={()=>router.push(`/user/assessment/${data._id}`)}/>}
                    {/* // <button className={styles.post} >{data.status === "Pending" ? 'Start now' : 'View'}</button>} */}
            </div>
            {type === "admin" && assignForm && <AssignForm quiz={data}/>}
        </div>
    )
}

export default QuizCard