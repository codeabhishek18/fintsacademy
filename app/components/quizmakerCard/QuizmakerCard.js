import styles from './QuizmakerCard.module.css'

const QuizmakerCard = ({data, handleEdit, active}) =>
{
    return <button className={data.id === active ? `${styles.container} ${styles.active}` : styles.container} onClick={()=> handleEdit(data)}>{data.id +1}</button>
    
}

export default QuizmakerCard