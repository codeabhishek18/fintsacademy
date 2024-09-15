'use client'

import Image from 'next/image';
import styles from './styles.module.css'
import BlurFade from "@/components/magicui/blur-fade";
import BoxReveal from '@/components/magicui/box-reveal';

const FeatureCard = ({feature, index}) =>
{
    const {title, img} = feature;

    return(
        <div className={styles.container}>
            <Image className={styles.icons} src={img} alt='image'/>
            <p className={styles.title}>{title}</p>
        </div>
    )
}

export default FeatureCard