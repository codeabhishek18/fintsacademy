import Image from 'next/image'
import styles from './styles.module.css'
import founder from '@/assets/founder.png'
import linkedin from '@/assets/linkedin.png'
import jpmorganLogo from '@/assets/jp-morgan.png'
import standardLogo from '@/assets/standard-chartered.png'
import mashreqLogo from '@/assets/mashreq.png'
import westernLogo from '@/assets/western-union.png'
import brightLogo from '@/assets/bright-money.png'
import Marquee from '@/components/magicui/marquee'

const Founder = () =>
{

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.founderImageWrapper}>
                    <a href='https://www.linkedin.com/in/lokesh-naik-amltrustedsource/' target='_blank'>
                        <Image className={styles.founderImage} src={founder} alt='Lokesh Naik'/>
                        <Image className={styles.icon} src={linkedin} alt='linkedin'/>
                    </a> 
                </div>
                <div className={styles.brief}>
                    <p className={styles.name}>Lokesh Naik</p>
                    <p>Founder & Mentor</p>
                </div>
            </div>
            <div className={styles.content}>
                <p className={styles.description}>
                With over a decade of expertise in financial services regulation and compliance, 
                Lokesh Naik has been a driving force in shaping the future of global financial crime prevention. 
                As an AML Trainer, he has influenced compliance strategies across top-tier banks, 
                excelling in diverse financial crime domains. His impact spans 15+ countries, 
                leaving a lasting imprint on international financial standards. 
                Embark on a journey of excellence guided by Lokesh’s unparalleled insights, 
                where mentorship and leadership pave the way for a new era in compliance.
                </p>                
                <div className={styles.work}>
                    <Marquee>
                        <Image className={styles.logo} src={jpmorganLogo} alt='logo'/>
                        <Image className={styles.logo} src={standardLogo} alt='logo'/>
                        <Image className={styles.mashreq} src={mashreqLogo} alt='logo'/>
                        <Image className={styles.western} src={westernLogo} alt='logo'/>
                        <Image className={styles.bright} src={brightLogo} alt='logo'/>
                    </Marquee>
                </div>
                
           </div>
        </div>
    )
}

export default Founder