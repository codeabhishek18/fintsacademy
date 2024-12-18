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
import trust from '@/assets/trust.png'
import lulu from '@/assets/lulu.png'
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
                    <p className={styles.marquee}>Transaction Monitoring & Simulation | Batch starting from 16th December</p>
                </div>

                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '50px' }}>
                    
                

                <Marquee pauseOnHover className="[--duration:30s] mt-16">
                    
                <h1 className='text-center text-2xl italic text-gray-500 font-bold m-14'>Top Client</h1>
                    <Link className='flex items-center justify-center' href='https://luluexchange.com/' target='_blank'>
                        <Image src={lulu} alt='client' height={150} width={150}/>
                        
                        <div>
                            <h1 className='text-gray-400'>Lulu Exchange</h1>
                            <h1 className='text-gray-400 italic'>Qatar</h1>
                        </div>
                    </Link>

                    <h1 className='text-center text-2xl italic text-gray-500 font-bold m-14'>Our Client</h1>
                    
                    <Link className='flex items-center justify-center' href='https://www.trustexchange.qa/' target='_blank'>
                       <Image src={trust} alt='client' height={150} width={150}/>
                        
                        <div>
                        <h1 className='text-gray-400'>Trust Exchange</h1>
                            <h1 className='text-gray-400 italic'>Qatar</h1>
                        </div>
                    </Link>
                </Marquee>
                    
                </motion.div>

                {/* <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '50px' }} className={styles.sectionWrapper}>
                    <div className={styles.quoteWrapper}>
                        <Image className={styles.quoteIcon} src={quoteIcon} alt='icon'/>
                        <p>The greatest weapon against crime is the prevention of crime</p>
                        <span style={{fontStyle:'italic'}}>— Robert Kennedy</span>
                    </div>
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
                </motion.div>         */}

                
                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{ margin: '50px' }} className={styles.actionWrapper}>
                    <Image className={styles.actionBg} src={growth} alt='Growth'/>
                    
                    <div className={styles.actionContent}>
                        <BoxReveal boxColor='rgba(0,0,0,0)'>
                            <p className={styles.action}>We specialize in <span className={styles.highlight}>Anti-Money Laundering (AML) and compliance training</span> tailored for both corporate teams and individual professionals. Our expert-led programs combine industry insights and practical skills to equip participants with the knowledge to navigate today’s complex regulatory landscape confidently.</p>
                        </BoxReveal>
                        
                        <BoxReveal boxColor='rgba(0,0,0,0)'>
                            <p className={styles.action}>
                                <span className={styles.highlight}>The market is expected to grow by 28% in the next five years.</span>  Seize the growing opportunities in Financial Crime Prevention! <span className={styles.highlight}> Skill up and stand out in the crowd</span>
                            </p>
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