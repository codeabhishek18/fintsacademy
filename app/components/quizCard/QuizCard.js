import { useState } from 'react';
import styles from './Quizcard.module.css'
import { usePathname, useRouter } from 'next/navigation';
import next from '@/assets/next-lg.png'
import test from '@/assets/test.png'
import edit from '@/assets/edit.png'
import Image from 'next/image';
import AssignForm from '../assignForm/AssignForm';
import Button from '../button/Button';

const QuizCard = ({type, data}) =>
{
    const [ assignForm, setAssignForm ] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    return(
        <div className={data.status === "Completed" ? `${styles.container} ${styles.success_bg}` : `${styles.container} ${styles.pending_bg}`}>
            <div className={styles.testWrapper}>
                <Image className={styles.test} src={test} alt='test'/>
                <Image className={styles.edit} src={edit} alt='test' onClick={()=> router.push(`${pathname}/edit?id=${data.title}`)}/>
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
                    <Button label='Batches' action={()=> router.push(`/admin/assessments/${data.title}`)}/>
                    <Button label='Assign' action={()=> setAssignForm(true)}/>
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