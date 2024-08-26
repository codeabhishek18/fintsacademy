import { Rating } from '@mui/material'
import styles from './styles.module.css'

const CarouselCard = ({data}) =>
{
    return(
        <div className={styles.container}>
            <p className={styles.user}>{data.name}</p>
            <Rating name="half-rating-read" defaultValue={data.rating} precision={1} readOnly />
            <p className={styles.feedback}>{data.comment}</p>
        </div>
    )
}

export default CarouselCard