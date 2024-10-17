import styles from './styles.module.css'

const CloseDialog = ({action}) =>
{
    return <button className={styles.close} onClick={action}>x</button>
}

export default CloseDialog