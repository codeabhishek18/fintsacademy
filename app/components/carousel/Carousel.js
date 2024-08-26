import { Feedback } from '@/utility/feedback'
import styles from './styles.module.css' 
import CarouselCard from '../carouselCard/CarouselCard'
import back_dr from '@/assets/back-dr.png' 
import next_dr from '@/assets/next-dr.png'
import back_lg from '@/assets/back-lg.png' 
import next_lg from '@/assets/next-lg.png'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useScheme } from '@/contextapi/SchemeProvider'

const Carousel = () =>
{

    const carouselRef = useRef(null);
    const [ slides, setSlides ] = useState(0);
    const [ cardsPerView, setCardsPerView ] = useState(0); 
    const { scheme } = useScheme();

    const updateCarouselWidth = () =>
    {
        if(carouselRef.current)
        {
            setCardsPerView(Math.floor((carouselRef.current?.offsetWidth)/(carouselRef.current?.children[0].offsetWidth)))
        }
    }

    useEffect(()=>
    {
        updateCarouselWidth();
        window.addEventListener('resize', updateCarouselWidth)

        return () => window.removeEventListener('resize', updateCarouselWidth);
    },[])

    return(
        <div className={styles.container}>
            <div className={styles.carousel} ref={carouselRef} style={{ transform: `translateX(-${slides * 100}%)`, transition: 'transform 0.75s ease-in-out' }}>
                {Feedback.map((data)=>
                (
                    <CarouselCard data={data} key={data.id}/>
                ))}
            </div>
            <div className={styles.controls}>
                {slides > 0 && 
                <Image className={styles.navigation} src={scheme === 'dark' ? back_dr : back_lg} alt='navigation' onClick={()=> setSlides((prev)=>  prev-1)}/>}
                {((slides+1)*cardsPerView) < Feedback.length && 
                <Image className={styles.navigation} src={scheme === 'dark' ? next_dr : next_lg} alt='navigation' onClick={()=> setSlides((prev)=>  prev+1)}/>}
            </div>
        </div>
    )
}

export default Carousel