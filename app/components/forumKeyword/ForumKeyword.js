import { TextField } from '@mui/material'
import styles from './ForumKeyword.module.css'
import { useState } from 'react'
import { keywords } from '@/utility/keywords';
import ForumKey from '../forumKey/ForumKey';

const ForumKeyword = ({handleKeywords}) =>
{
    const [keyword, setKeyword] = useState('');

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}}
                size='small' className={styles.keys} placeholder='Add keyword' name='keyword' value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
                <button className={styles.add} onClick={() => {handleKeywords(keyword); setKeyword('')}}>Add</button>
            </div>

            <div className={styles.keywords}>
            {keywords.map((keyword)=>
            (
                <ForumKey key={keyword.id} type="read" keyword={keyword.key} handleKeywords={handleKeywords}/>
            ))}
            </div>
        </div>
    )
}

export default ForumKeyword