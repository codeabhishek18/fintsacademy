'use client'

import styles from './styles.module.css'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Marquee from '@/components/magicui/marquee'
import { faqData } from '@/utility/faqData'
import { Feedback } from '@/utility/feedback'
import { complianceStats } from '@/utility/about'
import HeroSection from './components/heroSection/HeroSection'
import Accordian from './components/accordian/Accordian'
import Footer from './components/footer/Footer'
import CarouselCard from './components/carouselCard/CarouselCard'
import CommonHeader from './components/commonHeader/CommonHeader'
import FeatureCard from './components/featureCard/FeatureCard'
import Image from 'next/image'
import quoteIcon from '@/assets/quote.png'
import news_bg from '@/assets/news.jpg'
import paper_bg from '@/assets/paper.png'

const Home = () =>
{
    const [ showFaq, setShowFaq ] = useState(0);

    return(
        <div className={styles.wrapper}>
            <HeroSection/>
            <div className={styles.container}>
                <div className={styles.marqueeWrapper}>
                    <p className={styles.marquee}>Sanction Screening and Global Standards | Batches starting soon | Get enrolled via whatsapp</p>
                </div>

                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '-200px' }} className={styles.quoteWrapper}>
                    <Image className={styles.quoteIcon} src={quoteIcon} alt='icon'/>
                    <p>The greatest weapon against crime is the prevention of crime</p>
                    <span style={{fontStyle:'italic'}}>— Robert Kennedy</span>
                </motion.div>

                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '-200px' }} className={styles.statsWrapper}>
                    {complianceStats.map((content)=>
                    (
                        <div className={styles.statCard}>
                            <Image className={styles.newsBg} src={news_bg} alt='img'/>
                            <p className={styles.statValue}>
                                {content.value} 
                                <span className={styles.statHighlight}>{content.highlight}</span>
                                {content.context}
                            </p>
                        </div>
                    ))}
                </motion.div>

                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '-200px' }} className={styles.actionWrapper}>
                    <Image className={styles.actionBg} src={paper_bg} alt='news'/>
                    <p className={styles.info}><span className={styles.action}>Get ready to Skill Up</span> as the demand for compliance experts is soaring. The market is expected to <span className={styles.action}>grow by 28% in the next five years</span></p>
                </motion.div>
                
                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '-200px' }} className={styles.sectionWrapper}>
                    <CommonHeader header="Why you should join us!"/> 
                    <FeatureCard/>
                </motion.div>
                

                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '-200px' }} className={styles.sectionWrapper}>
                    <CommonHeader header="Testimonials"/>             
                    <Marquee pauseOnHover className="[--duration:60s]">
                    {Feedback.map((data)=>
                    (
                        <CarouselCard data={data} key={data.id}/>
                    ))}
                    </Marquee>
                </motion.div >
                
                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '-200px' }} className={styles.sectionWrapper}>
                    <CommonHeader header="FAQs"/>
                    <div className={styles.faqWrapper}>
                    {faqData.map((data, index)=>
                    (
                        <Accordian data={data} key={data.id} index={index} showFaq={showFaq} setShowFaq={setShowFaq}/>
                    ))}
                    </div>
                </motion.div >
                
            </div>
            <Footer/>
        </div>
    )
}

export default Home