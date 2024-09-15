import styles from './Message.module.css'

const Message = ({message, time}) =>
{

    return(
        <div className={styles.container}>
            <p className={styles.message}>{message}</p>
            <p className={styles.time}>{new Date(time).getHours()}:{new Date(time).getMinutes().toString().padStart(2, '0')}</p>
        </div>
    )
    
}

export default Message