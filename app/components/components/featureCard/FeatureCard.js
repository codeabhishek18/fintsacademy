'use client'

import Image from 'next/image';
import styles from './FeatureCard.module.css'

const FeatureCard = ({data}) =>
{
    const {title, img} = data;

    return(
        <div className={styles.container}>
            
            <p className={styles.title}>{title}</p>
        </div>       
    )
}

export default FeatureCard