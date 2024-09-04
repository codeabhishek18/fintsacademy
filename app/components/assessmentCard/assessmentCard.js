import { calculateResult } from '@/utility/calculateScores'
import styles from './styles.module.css'
import test from '@/assets/test.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const AssessmentCard = ({assessment, index, batchId}) =>
{

    const router = useRouter();

    return(
        <div className={styles.container} >
            <div className={styles.left}>
                <Image className={styles.test} src={test} alt='test'/>
                <p className={styles.status}>Assessment {index+1}</p>
            </div>
            {assessment.status === 'Completed' ? 
            <div className={styles.right}>
                <button className={calculateResult(assessment.score, assessment.quiz.length) === 'Pass' ? `${styles.status} ${styles.success}` : `${styles.status} ${styles.warning}`}>{calculateResult(assessment.score, assessment.quiz.length)}</button>
                <button className={styles.route} onClick={()=> router.push(`/dashboard/${batchId}/${assessment._id}`)}>Review</button>
            </div>:
            <div className={styles.right}>
                {/* <button className={styles.status} >{assessment.status}</button> */}
                <button className={styles.route} onClick={()=> router.push(`/dashboard/${batchId}/${assessment._id}`)}>Start assessment</button>
            </div>}
        </div>
    )
}

export default AssessmentCard