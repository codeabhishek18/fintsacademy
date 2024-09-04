import styles from './QuizmakerCard.module.css'

const QuizmakerCard = ({data, handleEdit}) =>
{
    return(
        <div className={styles.container} onClick={()=> handleEdit(data)}>
            <p className={styles.headers}>Question {data.id +1}</p>
            {/* <p className={styles.question}><span className={styles.headers}>Question : </span>{data.question}</p>
            <div className={styles.options}>
                {data?.options?.map((option,index)=>
                (
                    <p className={styles.option}><span className={styles.headers}>{index+1} : </span>{option}</p>
                ))}
            </div>
            <p className={styles.answer}><span className={styles.headers}>Answer : </span>{data.answer}</p>
            <p className={styles.reason}><span className={styles.headers}>Reason : </span>{data.reason}</p> */}
        </div>
    )
}

export default QuizmakerCard