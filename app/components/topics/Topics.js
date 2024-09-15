import Marquee from "@/components/magicui/marquee"
import styles from './styles.module.css'
const { transactionMonitoringKeywords, kycKeywords, globalStandardsKeywords } = require("@/utility/categoryKeywords")

const Topics = () =>
{
    return(
        <div>
            <Marquee pauseOnHover className="[--duration:60s]">
                {transactionMonitoringKeywords.map((data)=>
                (
                    <p key={data.keyword} className={styles.topic}>{data.keyword}</p>
                ))}
            </Marquee>
            <Marquee pauseOnHover className="[--duration:60s]" reverse={true}>
                {kycKeywords.map((data)=>
                (
                    <p key={data.keyword} className={styles.topic}>{data.keyword}</p>
                ))}
            </Marquee>
            <Marquee pauseOnHover className="[--duration:60s]">
                {globalStandardsKeywords.map((data)=>
                (
                    <p key={data.keyword} className={styles.topic}>{data.keyword}</p>
                ))}
            </Marquee>
        </div>
    )
}

export default Topics