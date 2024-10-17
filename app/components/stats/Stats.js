import BoxReveal from '@/components/magicui/box-reveal';
import styles from './styles.module.css'
import BlurFade from "@/components/magicui/blur-fade";

const numbers = [
    {
        id: 1,
        title: 'Courses',
        count: '04'
    },
    {
        id: 2,
        title: 'Community',
        count: '1000+'
    },
    {
        id: 3,
        title: 'Rating',
        count: '4.7'
    }
]

const Stats = () =>
{

    return(
        <div className={styles.container}>
            {numbers.map((data, index) =>
            (
                <div className={styles.column} key={data.id}>
                    <span className={styles.title}>{data.title}</span>
                    <p className={styles.count}>{data.count}</p>
                </div>
            ))}
        </div>
    )
}

export default Stats 