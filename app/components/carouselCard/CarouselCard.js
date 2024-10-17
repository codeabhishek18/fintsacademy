import { Rating } from '@mui/material'
import styles from './styles.module.css'
import comment from '@/assets/comment.png'
import Image from 'next/image'

const CarouselCard = ({data}) =>
{
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <Image className={styles.commentIcon} src={comment} alt='icon'/>
                <p className={styles.feedback}>{data.comment}</p>
            </div>
            <div className={styles.footer}>
                <p className={styles.user}>{data.name}</p>
                <Rating className={styles.name} name="half-rating-read" defaultValue={data.rating} precision={1} readOnly />
            </div>
        </div>
    )
}

export default CarouselCard