import { useRouter } from 'next/navigation';
import styles from './GroupCard.module.css'

const GroupCard = ({data}) =>
{
    const router = useRouter();

    return(
        <div className={styles.container}>
            <p className={styles.title}>{data.batch.title}</p>
            <p className={styles.quiz}>Participants : {data.assignment.length}</p>
            {/* <p className={styles.quiz}>Status : {data.status}</p> */}
            <div className={styles.buttons}>
                <button className={styles.post} onClick={()=>router.push(`/admin/quiz/batch/${data._id}`)}>Participants</button>
                {/* {type === "admin" ? 
                    <button className={styles.post} onClick={()=>setAssignForm(true)}>Assign</button> :
                    <button className={styles.post} onClick={()=>router.push(`/user/assessment/${data._id}`)}>{data.status === "Pending" ? 'Start now' : 'View'}</button>} */}
            </div>
        </div>
    )
}

export default GroupCard