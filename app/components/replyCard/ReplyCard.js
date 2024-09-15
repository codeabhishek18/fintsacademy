import styles from './ReplyCard.module.css'
import user from '@//assets/user.png'
import Image from 'next/image'
import { FormatTime } from '@/utility/formatTime'

const ReplyCard = ({data, type, setShowReply, replyId}) =>
{

    return(
        <div className={styles.container}>
            <Image className={styles.user} src={user} alt='img'/>
            <div className={styles.content}>
                <p className={styles.username}>{data?.author?.name}</p>
                <p className={styles.comment}>{type === "comment" ? data.comment : data.reply}</p>
                <div className={styles.footer}>
                    {type === "comment" && <p className={styles.reply} onClick={()=> setShowReply(replyId)}>reply</p>}
                    {type === "comment" && <p className={styles.date}>•</p>}
                    <p className={styles.date}>{FormatTime(data.createdAt)}</p>
                </div>
            </div>
            {/* <p className={styles.like}>{data.like}</p> */}
        </div>
    )
}

export default ReplyCard