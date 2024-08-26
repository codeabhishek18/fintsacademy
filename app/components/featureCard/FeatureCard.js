'use client'

import Image from 'next/image';
import styles from './styles.module.css'

const FeatureCard = ({feature}) =>
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