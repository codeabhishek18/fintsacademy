import styles from './styles.module.css'

const MentorCard = ({ data }) =>
{
    return(
        <div className={styles.container}>
           <p className={styles.title}>{data.name}</p>
           <p className={styles.title}>{data.email}</p>
           <p className={styles.title}>{data.phone}</p>
           <p className={styles.title}>{data.about}</p>
           <p className={styles.title}>{data.experience}</p>
           <p className={styles.title}>{data.linkedin}</p>
        </div>
    )
}

export default MentorCard