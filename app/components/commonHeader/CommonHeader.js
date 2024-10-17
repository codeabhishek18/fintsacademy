import styles from './styles.module.css'
import BoxReveal from "@/components/magicui/box-reveal"

const CommonHeader = ({header}) =>
{
    return(
        <BoxReveal boxColor='rgba(0,0,0,0)'>
            <h1 className={styles.commonHeader}>{header}</h1>
        </BoxReveal>  
    )
}

export default CommonHeader