import styles from  './styles.module.css'
import show_dr from '@/assets/plus-dr.png'
import show_lg from '@/assets/plus-lg.png'
import close from '@/assets/close.png'
import Image from 'next/image'
import { FadeText } from '@/components/magicui/fade-text'
import BoxReveal from '@/components/magicui/box-reveal'

const Accordian = ({data, index, showFaq, setShowFaq}) =>
{
    return(
        <div className={styles.container} onClick={()=> setShowFaq((prev)=> prev===index+1 ? 0 : index+1)}>
             
            <div className={styles.query}>
                <BoxReveal boxColor='var(--primary-bg)' duration={0.5} className={styles.query}>
                    
                    <p className={styles.question}>{data.question}</p>
                </BoxReveal>
                <Image className={styles.icon} src={showFaq === index+1 ? close : show_lg} alt='icon'/>
                {/* <FadeText className={styles.question} direction="up" framerProps={{ show: { transition: { delay: 0.2 }}}} text={data.question}/> */}
                
            </div>
            {showFaq === index+1 && <p className={styles.answer }><FadeText className={styles.question} direction="up" framerProps={{ show: { transition: { delay: 0.2 }}}} text={data.answer}/></p>}
        </div>
    )
}

export default Accordian