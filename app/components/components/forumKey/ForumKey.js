import styles from './ForumKey.module.css'

const ForumKey = ({type, keyword, handleKeywords, removeKeyWord}) =>
{        
    return(
        <div className={styles.container}>
            {type === "read" ? 
            <p className={styles.keyword} onClick={()=> handleKeywords(keyword)}>{keyword}</p> :
            <p className={styles.keyword}>{keyword}</p>}

            {type === "edit" && <p className={styles.close} onClick={() => removeKeyWord(keyword)}>x</p>}
        </div>
    )
}

export default ForumKey