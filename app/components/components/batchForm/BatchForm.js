import batchFormStyles from './BatchForm.module.css'

const BatchForm = ({batchData, courses, mentors, handleChange, handleSubmit, setBatchForm}) =>
{    

return(
    <div className={batchFormStyles.wrapper}>
        <div className={batchFormStyles.container}>
            <h1 className={batchFormStyles.header}>Add Batch</h1> 
            <select className={batchFormStyles.course} name="courseId" value={batchData.course} onChange={handleChange}>
                <option value=''>Choose course</option>
                {courses?.map((course) =>
                (
                    <option value={course._id} key={course._id}>{course.title}</option>
                ))}
            </select>
            <input className={batchFormStyles.title} name='title' value={batchData.title} placeholder='Batch Title' onChange={handleChange}/>
            <select className={batchFormStyles.mentor} name="mentor" value={batchData.mentor} onChange={handleChange}>
                <option value=''>Choose mentor</option>
                {mentors?.map((mentor) =>
                (
                    <option value={mentor._id} key={mentor._id}>{mentor.name}</option>
                ))}
            </select>
            <input className={batchFormStyles.startDate} name='startDate' value={batchData.startDate} placeholder='Start date' onChange={handleChange}/>
            <input className={batchFormStyles.endDate} name='endDate' value={batchData.endDate} placeholder='End Date' onChange={handleChange}/>
            <button className={batchFormStyles.createButton} onClick={handleSubmit}>Create Batch</button>
            <span className={batchFormStyles.close} onClick={()=> setBatchForm(false) }>X</span>
        </div>
    </div>
    )
}

export default BatchForm