import { Rating } from '@mui/material'
import styles from './styles.module.css'
import BoxReveal from '@/components/magicui/box-reveal'

const CarouselCard = ({data}) =>
{
    return(
        <div className={styles.container}>
                <p className={styles.user}>{data.name}</p>
                <Rating className={styles.name} name="half-rating-read" defaultValue={data.rating} precision={1} readOnly />
                <p className={styles.feedback}>{data.comment}</p>
            
        </div>
    )
}

export default CarouselCard