import axios from 'axios';
import styles from './PopularCard.module.css'
import { useEffect, useState } from 'react';

const PopularCard = ({handleChange, getTopics, topics}) =>
{
    const [ active, setActive ] = useState(null);

    useEffect(()=>
    {
        getTopics();
    },[])

    const handleClick = (e) =>
    {
        e.stopPropagation();
        handleChange('topic', '')
        setActive(null)
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.header}>Popular Topics</h1>
            {topics?.map((topic, index) =>
            (
                <div key={index}  className={index === active ? `${styles.topic} ${styles.active}` : styles.topic } onClick={()=> {handleChange('topic', topic._id); setActive(index)}}>
                    <p className={styles.title}>{index+1 +'. ' +topic._id}</p>  
                    <p className={styles.count}>Discussions : {topic.count}</p>    
                    {index === active && <p className={styles.clear} onClick={handleClick}>x</p>}    
                </div>
            ))}            
        </div>
    )
} 

export default PopularCard