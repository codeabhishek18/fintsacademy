import { useState } from 'react'
import styles from './UserCard.module.css'
import up from '../../assets/up.png'
import down from '../../assets/down.png'
import Image from 'next/image'
import { FormatDate } from '@/utility/FormatDate'

const calculatePercentile = (score, questions) =>
{
    return Math.ceil((score*100)/questions)
}

const calculateResult = (score, questions) =>
{
    const result = calculatePercentile(score, questions) > 75 ? 'Pass' : 'Fail'
    return result
}

const UserCard = ({user, test}) =>
{
    const [ showResult, setShowresult ] = useState(false)

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.user}>{user.firstname +' ' +user.lastname}</p>
                <div className={styles.testDetails}>
                    {test.status === "Completed" ? <button className={calculateResult(test.score, test.quiz.length) === 'Pass' ? `${styles.status} ${styles.success}`: `${styles.status} ${styles.alert}`}>{calculateResult(test.score, test.quiz.length)}</button> :
                    <button className={`${styles.status} ${styles.warning}`}>{test.status}</button>}
                    <Image className={styles.more} src={showResult ? up : down} alt='arrow' onClick={()=> setShowresult(!showResult)}/>
                </div>
            </div>
            {showResult && (test.status === "Completed" ? 
            <div className={styles.result}>
                <div className={styles.group}>
                    <p className={styles.left}>Attempted on</p>
                    <p className={styles.right}>{FormatDate(test.updatedAt)}</p>
                </div>
                <div className={styles.group}>
                    <p className={styles.left}>Score</p>
                    <p className={styles.right}>{test.score +'/' +test.quiz.length}</p>
                </div>
                <div className={styles.group}>
                    <p className={styles.left}>Percentile</p>
                    <p className={styles.right}>{calculatePercentile(test.score, test.quiz.length)}%</p>
                </div>
                <div className={calculateResult(test.score, test.quiz.length) === 'Pass' ? `${styles.group} ${styles.success}`: `${styles.group} ${styles.alert}`}>
                    <p className={styles.left}>Result</p>
                    <p className={styles.right}>{calculatePercentile(test.score, test.quiz.length) > 75 ? 'Pass' : 'Fail'}</p>
                </div>
            </div> : 
            <p className={styles.result}>Test is yet to be taken</p>)}
        </div>
    )
}

export default UserCard