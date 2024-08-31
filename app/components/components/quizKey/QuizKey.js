import styles from './QuizKey.module.css'

const QuizKey = ({type, id, selectedId, keyword, handleKeywords, removeKeyWord}) =>
{        
    return(
        <div className={styles.container}>
            {type === "read" ? 
            <p className={styles.keyword} onClick={()=> handleKeywords(keyword, selectedId)}>{keyword}</p> :
            <p className={styles.keyword}>{keyword}</p>}

            {type === "edit" && <p className={styles.close} onClick={() => removeKeyWord(id)}>x</p>}
        </div>
    )
}

export default QuizKey