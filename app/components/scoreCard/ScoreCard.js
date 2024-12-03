import { useRouter } from 'next/navigation'
import styles from './ScoreCard.module.css'
import { calculatePercentile, calculateResult } from '@/utility/calculateScores';
import Button from '../button/Button';

const Scorecard = ({data}) =>
{
    const router = useRouter();

    console.log(data)

    return(
        <div className={styles.container}>
            <h1 className={styles.header}>Assessment Result</h1>
            <div className={styles.details}>
                <div className={styles.group}>
                    <span>Total Questions</span>
                    <span>{data.quizDetails.quiz.length}</span>
                </div>
                <div className={styles.group}>
                    <span>Right Answers</span>
                    <span>{data.score}</span>
                </div>
                <div className={styles.group}>
                    <span>Wrong Answers</span>
                    <span>{data.quizDetails.quiz.length - data.score}</span>
                </div>
                <div className={styles.group}>
                    <span>Percentile</span>
                    <span>{calculatePercentile(data.score, data.quizDetails.quiz.length)}%</span>
                </div>
                <div className={calculateResult(data.score, data.quizDetails.quiz.length) === "Qualified" ? `${styles.group} ${styles.success}` : `${styles.group} ${styles.alert}`}>
                    <span>Result</span>
                    <span>{calculateResult(data.score, data.quizDetails.quiz.length)}</span>
                </div>
            </div>
            <Button label='Dashboard' action={()=> router.push('/dashboard')}/>
        </div> 
    )
}

export default Scorecard