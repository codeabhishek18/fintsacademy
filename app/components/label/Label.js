import styles from './styles.module.css'

const Label = ({label}) =>
{
    return <p className={styles.container}>{label}</p>
}

export default Label