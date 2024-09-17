import { useRouter } from 'next/navigation'
import styles from './ScoreCard.module.css'
import { calculatePercentile, calculateResult } from '@/utility/calculateScores';

const Scorecard = ({data}) =>
{
    const router = useRouter();

    return(
        <div className={styles.container}>
            <h1 className={styles.head}>Assessment Result</h1>
            <div className={styles.card}>
                <div className={styles.group}>
                    <p className={styles.left}>Total Questions</p>
                    <p className={styles.right}>{data.quiz.length}</p>
                </div>
                <div className={styles.group}>
                    <p className={styles.left}>Right Answers</p>
                    <p className={styles.right}>{data.score}</p>
                </div>
                <div className={styles.group}>
                    <p className={styles.left}>Wrong Answers</p>
                    <p className={styles.right}>{data.quiz.length - data.score}</p>
                </div>
                <div className={styles.group}>
                    <p className={styles.left}>Percentile</p>
                    <p className={styles.right}>{calculatePercentile(data.score, data.quiz.length)}%</p>
                </div>
                <div className={calculateResult(data.score, data.quiz.length) === "Qualified" ? `${styles.group} ${styles.success}` : `${styles.group} ${styles.alert}`}>
                    <p className={styles.left}>Result</p>
                    <p className={styles.right}>{calculateResult(data.score, data.quiz.length)} </p>
                </div>
            </div>
            <button className={styles.checkout} onClick={()=> router.push('/dashboard')}>Go to Dashboard</button>
        </div> 
    )
}

export default Scorecard