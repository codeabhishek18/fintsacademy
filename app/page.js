'use client'

import styles from './styles.module.css'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Features } from '@/utility/features'
import { about } from '@/utility/about'
import { faqData } from '@/utility/faqData'
import { shimmerCourseData } from '@/utility/shimmerData'
import { useScheme } from '@/contextapi/SchemeProvider'
import HeroSection from './components/heroSection/HeroSection'
import ErrorDialogue from './components/errorDialogue/ErrorDialogue'
import Stats from './components/stats/Stats'
import FeatureCard from './components/featureCard/FeatureCard'
import CourseCard from './components/courseCard/CourseCard'
import ShimmerCourseCard from './components/shimmerCourseCard/ShimmerCourseCard'
import Certificate from './components/certificate/Certificate'
import Carousel from './components/carousel/Carousel'
import Accordian from './components/accordian/Accordian'
import Footer from './components/footer/Footer'

const Home = () =>
{
    const aboutRef = useRef(null);
    const courseRef = useRef(null);
    const faqRef = useRef(null);
    const [ courses, setCourses ] = useState(null);
    const [ showFaq, setShowFaq ] = useState(0);
    const [ error, setError ] = useState(false);
    const { scheme } = useScheme();
    
    useEffect(()=>
    {
        getCourses();
    },[]);

    const getCourses = async () =>
    {
        try
        {
            const url = '/api/course'
            const response = await axios.get(url);
            console.log(response);
            if(response?.data?.courses)
            {
                setCourses(response.data.courses);
                return 
            }
            setError(true);        
        }
        catch(error)
        {
            console.log('error', error)
            setError(true);   
        }
    }

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
                    <p className={styles.marqueeContent}>Coming soon | New batches starting from 6th September | Get enrolled via whatsapp</p>
                </div>

                {error && <ErrorDialogue setError={setError}/>}

                <div className={styles.aboutWrapper} ref={aboutRef}>
                    <Stats/>
                    <p className={styles.about}>{about}</p>
                    <div className={styles.features}>
                    {Features.map((feature)=>
                    (
                        <FeatureCard feature={feature} key={feature.id}/>
                    ))}
                    </div>
                </div>

                <div className={styles.courseWrapper} ref={courseRef}>
                    {!error && <p className={styles.commonHeader}>Courses</p>}
                    {courses ? 
                    <div className={styles.courses}>
                        {courses.map((course)=>
                        (
                            <CourseCard course={course} key={course._id}/>
                        ))}
                    </div> :
                    (error ? <></> :
                    <div className={styles.courses}>
                        {shimmerCourseData.map((data, index)=>
                        (
                            <ShimmerCourseCard key={data.id}/>
                        ))}
                    </div>)}
                </div>

                <Certificate/>

                <div className={styles.carouselWrapper}>
                    <p className={styles.commonHeader}>Testimonials</p>
                    <Carousel/>
                </div>
                
                <div className={styles.faqWrapper} ref={faqRef}>
                    <p className={styles.commonHeader}>FAQ</p>
                    <div className={styles.faq}>
                    {faqData.map((data, index)=>
                    (
                        <Accordian data={data} key={data.id} index={index} showFaq={showFaq} setShowFaq={setShowFaq}/>
                    ))}
                    </div>
                </div>
    
            </div>
            <Footer/>
        </div>
    )
}

export default Home

