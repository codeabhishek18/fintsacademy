import styles from './QuizKey.module.css'

const QuizKey = ({type, isDup, id, selectedId, keyword, handleKeywords, removeKeyWord}) =>
{        

    console.log(isDup);

    console.log(selectedId)

    return(
        <div className={type === 'read' ? `${styles.container} ${styles.edit}` : `${styles.container} ${styles.selected}`}>
            {type === "read" ? 
            <p className={isDup.includes(selectedId) ? `${styles.keyword} ${styles.dup}` : styles.keyword} 
                onClick={()=> 
                {
                    if(isDup && isDup?.includes(selectedId))
                        return
                    handleKeywords(keyword, selectedId)}}>{keyword}</p> :
            <p className={styles.keyword}>{keyword}</p>}

            {type === "edit" && <p className={styles.close} onClick={() => removeKeyWord(id)}>x</p>}
        </div>
    )
}

export default QuizKey