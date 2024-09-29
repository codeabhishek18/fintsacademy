'use client'

import styles from './styles.module.css'
import { useEffect, useRef, useState } from 'react'
import { Features } from '@/utility/features'
import { about } from '@/utility/about'
import { faqData } from '@/utility/faqData'
import { useScheme } from '@/contextapi/SchemeProvider'
import HeroSection from './components/heroSection/HeroSection'
import ErrorDialogue from './components/errorDialogue/ErrorDialogue'
import Stats from './components/stats/Stats'
import FeatureCard from './components/featureCard/FeatureCard'
import Certificate from './components/certificate/Certificate'
import Carousel from './components/carousel/Carousel'
import Accordian from './components/accordian/Accordian'
import Footer from './components/footer/Footer'
import { motion } from 'framer-motion'
import BoxReveal from "@/components/magicui/box-reveal";
import Marquee from '@/components/magicui/marquee'
import { Feedback } from '@/utility/feedback'
import CarouselCard from './components/carouselCard/CarouselCard'
import Topics from './components/topics/Topics'


const Home = () =>
{
    const [ showFaq, setShowFaq ] = useState(0);

    return(
        <div className={styles.wrapper}>
            <HeroSection/>
            <div className={styles.container}>
                <div className={styles.marquee}>
                    <p className={styles.marqueeContent}>Sanction Screening and Global Standards | Batches starting soon | Get enrolled via whatsapp</p>
                </div>

                <motion.div 
                    initial={{opacity: 0}}
                    whileInView={{opacity:1}}
                    viewport={{
                        margin: '-100px',
                    }}
                    className={styles.aboutWrapper}>
                    <Stats/>
                    
                    <div className={styles.about}>
                    <BoxReveal boxColor={"rgba(0,0,0,0.1"} duration={0.5}>
                        {about}
                    </BoxReveal>
                    </div>

                    <div className={styles.features}>
                    {Features.map((feature, index)=>
                    (
                        <FeatureCard feature={feature} index={index} key={feature.id}/>
                    ))}
                    </div>
                </motion.div>

                {/* <motion.div 
                    initial={{opacity: 0}}
                    whileInView={{opacity:1}}
                    viewport={{
                        margin: '-200px',
                    }} className={styles.carouselWrapper}>
                    <BoxReveal boxColor={"rgb(15, 18, 18)"} duration={0.5}>
                        <p className={styles.commonHeader}>Testimonials</p>
                    </BoxReveal>
                    
                    <Carousel/>
                </motion.div > */}


                <div className={styles.carouselWrapper}>
                    <BoxReveal boxColor={"#202227"} duration={0.5}>
                        <p className={styles.commonHeader}>Testimonials</p>
                    </BoxReveal>                
                    <Marquee pauseOnHover className="[--duration:60s]">
                    {Feedback.map((data)=>
                    (
                        <CarouselCard data={data} key={data.id}/>
                    ))}
                    </Marquee>
               </div>
                
                <motion.div 
                    initial={{opacity: 0}}
                    whileInView={{opacity:1}}
                    viewport={{
                        margin: '-100px',
                    }} className={styles.faqWrapper}>  
                    <BoxReveal boxColor={"#202227"} duration={0.5}>
                        <p className={styles.commonHeader}>FAQs</p>
                    </BoxReveal>
                    
                    <div className={styles.faq}>
                    {faqData.map((data, index)=>
                    (
                        <Accordian data={data} key={data.id} index={index} showFaq={showFaq} setShowFaq={setShowFaq}/>
                    ))}
                    </div>
                </motion.div >

                <Certificate/>

                <Topics/>
    
            </div>
            <Footer/>
        </div>
    )
}

export default Home

