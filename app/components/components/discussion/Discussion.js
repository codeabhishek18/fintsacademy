import styles from './Discussion.module.css'
import deleteIcon from '../../assets/delete.png'
import Image from 'next/image';
import ForumKey from '../forumKey/ForumKey';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const Discussion = ({id, author, title, date, like, keywords, handleDelete}) =>
{
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}>{title}</p>
                <Image className={styles.deleteIcon} src={deleteIcon} alt='delete' onClick={()=> handleDelete(id)}/>
            </div>
            <div className={styles.footer}>
                <p className={styles.author}>Posted by {author.firstname}</p>
                <p className={styles.author}>•</p>
                <p className={styles.author}>{new Date(date).toLocaleDateString('en-US', options)}</p>
            </div>
            <div className={styles.keywords}>
            {keywords.map((key, index)=>
            (
                <ForumKey key={index} type="read" keyword={key}/>
            ))}
            </div>
        </div>
    )
}

export default Discussion