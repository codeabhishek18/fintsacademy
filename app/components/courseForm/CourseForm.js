import courseFormStyles from './CourseForm.module.css'

const CourseForm = ({data, handleChange, handleSubmit}) =>
{    
    return(
        <div className={courseFormStyles.container}>
            <div className={courseFormStyles.header}>
                <input className={courseFormStyles.title} name='title' value={data.title} placeholder='Course Title' onChange={handleChange}/>
                <button className={courseFormStyles.createButton} onClick={handleSubmit}>Create Course</button>
            </div>
            <textarea className={courseFormStyles.description} name='description' value={data.description} placeholder='Description' onChange={handleChange}/>
        </div>
    )
}

export default CourseForm