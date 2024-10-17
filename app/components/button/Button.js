import styles from './styles.module.css'

const Button= ({label, action, fullwidth, size}) =>
{
    return <button className={fullwidth ? `${styles.route} ${styles.fullwidth}` : (size === 'small' ? `${styles.route} ${styles.small}` : styles.route)} onClick={action} type='submit'>{label}</button>
}

export default Button