import { useState } from 'react';
import styles from './Quizcard.module.css'
import { useRouter } from 'next/navigation';
import next from '@/assets/next-lg.png'
import test from '@/assets/test.png'
import Image from 'next/image';
import AssignForm from '../assignForm/AssignForm';

const QuizCard = ({type, data}) =>
{
    const [ assignForm, setAssignForm ] = useState(false);
    const router = useRouter();

    return(
        <div className={data.status === "Completed" ? `${styles.container} ${styles.success_bg}` : `${styles.container} ${styles.pending_bg}`}>
           <div className={styles.testWrapper}>
           <Image className={styles.test} src={test} alt='test'/>
           </div>
           <div className={styles.content}>
           <p className={styles.title}>{data.course.title +' ' +data.course.level}</p>
            {type === "admin" && 
            <div className={styles.adminData}>
                <p className={styles.quiz}>{data.title}</p>
                <p className={styles.quiz}>Assigned batches : {data.group.length}</p>
               
            </div>}
            {type === 'admin' ?  
            <div className={styles.footer}>
                <p className={styles.questions}>{data.quiz.length} Questions</p>
                <div className={styles.routes}>
                    <button className={styles.post} onClick={()=>router.push(`/admin/assessments/${data.title}`)}>Batches</button>
                    <button className={styles.post} onClick={()=>setAssignForm(true)}>Assign</button>
                </div>
            </div> :
            <div className={styles.buttons}>
                <Image className={styles.next} src={next} alt='next' onClick={()=>router.push(`/user/assessment/${data._id}`)}/>
            </div>}
           </div>
                
                {/* // <button className={styles.post} >{data.status === "Pending" ? 'Start now' : 'View'}</button>} */}
            {type === "admin" && assignForm && <AssignForm quiz={data} setAssignForm={setAssignForm}/>}
        </div>
    )
}

export default QuizCard