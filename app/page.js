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
    const aboutRef = useRef(null);
    const courseRef = useRef(null);
    const faqRef = useRef(null);
    const [ showFaq, setShowFaq ] = useState(0);
    const [ error, setError ] = useState(false);
    const { scheme } = useScheme();

    const handleScroll = (section) =>
    {
        if(aboutRef.current && section === 'about')
            aboutRef.current.scrollIntoView({ behavior: 'smooth' })

        if(courseRef.current && section === 'course')
            courseRef.current.scrollIntoView({ behavior: 'smooth' })

        if(faqRef.current && section === 'faq')
            faqRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return(
        <div className={styles.wrapper}>
            <HeroSection handleScroll={handleScroll}/>
            <div className={scheme === 'dark' ? styles.container : `${styles.container} ${styles.light}`}>
                <div className={styles.marquee}>
                    <p className={styles.marqueeContent}>Coming soon | New batches starting from 28th September | Get enrolled via whatsapp</p>
                </div>

                {error && <ErrorDialogue setError={setError}/>}

                <motion.div 
                    initial={{opacity: 0}}
                    whileInView={{opacity:1}}
                    viewport={{
                        margin: '-100px',
                    }}
                    className={styles.aboutWrapper} ref={aboutRef}>
                    <Stats/>
                    
                    <div className={styles.about}>
                    <BoxReveal boxColor={"#202227"} duration={0.5}>
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
                    }} className={styles.faqWrapper} ref={faqRef}>  
                    <BoxReveal boxColor={"rgb(15, 18, 18)"} duration={0.5}>
                        <p className={styles.commonHeader}>FAQ</p>
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

