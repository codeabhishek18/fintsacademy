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
import chat from '@/assets/chat.png'
import close from '@/assets/close.png'
import growth from '@/assets/hire.webp'
import Query from './components/query/Query'
import BoxReveal from '@/components/magicui/box-reveal'
import Link from 'next/link'

const Home = () =>
{
    const [ showFaq, setShowFaq ] = useState(0);
    const [ showMessage, setShowMessage ] = useState(false);

    return(
        <div className={styles.wrapper}>
            <HeroSection/>
            <div className={styles.container}>
                <div className={styles.marqueeWrapper}>
                    <p className={styles.marquee}>Sanction Screening and Global Standards | Batches starting soon</p>
                </div>

                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '50px' }} className={styles.sectionWrapper}>
                    {/* <div className={styles.quoteWrapper}>
                        <Image className={styles.quoteIcon} src={quoteIcon} alt='icon'/>
                        <p>The greatest weapon against crime is the prevention of crime</p>
                        <span style={{fontStyle:'italic'}}>— Robert Kennedy</span>
                    </div> */}
                    <div className={styles.statsWrapper}>
                    {complianceStats.map((content)=>
                    (
                        <BoxReveal boxColor='var(--primary-bg)'>
                            <div className={styles.statCard}>
                            <Image className={styles.newsBg} src={news_bg} alt='img'/>
                            <p className={styles.statValue}>
                                {content.value} 
                                <span className={styles.statHighlight}>{content.highlight}</span>
                                {content.context}
                            </p>
                        </div>
                        </BoxReveal>
                    ))}
                    </div>
                </motion.div>        

                
                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '50px' }} className={styles.actionWrapper}>
                    <Image className={styles.actionBg} src={growth} alt='Growth'/>
                    
                    <div className={styles.actionContent}>
                        <BoxReveal boxColor='rgba(0,0,0,0)'>
                            <p className={styles.action}>Get ready to skill up and seize the growing opportunities in <span className={styles.highlight}>Financial Crime Prevention!</span> As the demand for compliance and cybersecurity experts is soaring, <span className={styles.highlight}>the market is expected to grow by 28% in the next five years.</span></p>
                        </BoxReveal>
                        <BoxReveal boxColor='rgba(0,0,0,0)'>
                            <Link className={styles.explore} href='/courses'>Explore Courses</Link>
                        </BoxReveal>
                    </div>
                </motion.div>

                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '50px' }} className={styles.sectionWrapper}>
                    <CommonHeader header='Why Choose Us'/>
                    <FeatureCard/>
                </motion.div>
                
                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '50px' }} className={styles.sectionWrapper}>
                    <CommonHeader header="Testimonials"/>             
                    <Marquee pauseOnHover className="[--duration:60s]">
                    {Feedback.map((data)=>
                    (
                        <CarouselCard data={data} key={data.id}/>
                    ))}
                    </Marquee>
                </motion.div >
                
                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '50px' }} className={styles.sectionWrapper}>
                    <CommonHeader header="FAQs"/>
                    <div className={styles.faqWrapper}>
                    {faqData.map((data, index)=>
                    (
                        <Accordian data={data} key={data.id} index={index} showFaq={showFaq} setShowFaq={setShowFaq}/>
                    ))}
                    </div>
                </motion.div >
                
                <Image className={styles.chat} src={showMessage ? close : chat} alt='chat' onClick={()=> setShowMessage(!showMessage)}/>

                {showMessage && 
                <div className={styles.query}>
                    <Query setShowMessage={setShowMessage}/>
                </div>}

            </div>
            <Footer/>
        </div>
    )
}

export default Home