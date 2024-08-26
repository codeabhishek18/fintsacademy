import styles from './styles.module.css'

const HamburgerMenu = ({setShowSlider}) =>
{

    return(
        <div className={styles.container} onClick={()=> setShowSlider(true)}>
            <div className={styles.row}></div>
            <div className={styles.row}></div>
            <div className={styles.row}></div>
        </div>
    )
}

export default HamburgerMenu