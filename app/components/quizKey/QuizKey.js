import styles from './QuizKey.module.css'

const QuizKey = ({type, isDup, id, selectedId, keyword, handleKeywords, removeKeyWord}) =>
{        

    return(
        <div className={type === 'read' ? `${styles.container} ${styles.edit}` : `${styles.container} ${styles.selected}`}>
            {type === "read" ? 
            <p className={styles.keyword} 
                onClick={()=> 
                {
                    
                    handleKeywords(keyword, selectedId)}}>{keyword}</p> :
            <p className={styles.keyword}>{keyword}</p>}

            {type === "edit" && <p className={styles.close} onClick={() => removeKeyWord(id)}>x</p>}
        </div>
    )
}

export default QuizKey