import stats from './Stats.module.css'

const numbers = [
    {
        id: 1,
        title: 'Courses',
        count: '4'
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
        <div className={stats.container}>
            {numbers.map((data) =>
            (
                <div className={stats.column} key={data.id}>
                    <span className={stats.title}>{data.title}</span>
                    <p className={stats.count}>{data.count}</p>
                </div>
            ))}
        </div>
    )
}

export default Stats 