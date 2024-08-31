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
                <TextField size='small' variant='outlined' className={styles.keys} label='Add keyword' color='grey' name='keyword' value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
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