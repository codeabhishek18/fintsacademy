import styles from './styles.module.css'
import BoxReveal from "@/components/magicui/box-reveal"

const CommonHeader = ({header}) =>
{
    return(
        <BoxReveal className={styles.wrapper} boxColor='var(--primary-bg)' duration={0.5} >
            <p className={styles.commonHeader}>{header}</p>
        </BoxReveal>  
    )
}

export default CommonHeader