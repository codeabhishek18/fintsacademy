import moduleFormStyles from './ModuleForm.module.css'

const ModuleForm = ({data, handleChange, handleSubmit, setModuleForm}) =>
{    
    return(
        <div className={moduleFormStyles.wrapper}>
            <div className={moduleFormStyles.container}>
                <h1 className={moduleFormStyles.header}>Add module</h1>
                <input className={moduleFormStyles.title} name='title' value={data.title} placeholder='Course Title' onChange={handleChange}/>
                <textarea className={moduleFormStyles.agenda} name='agenda' value={data.agenda} placeholder='Agenda' onChange={handleChange}/>
                <button className={moduleFormStyles.createButton} onClick={handleSubmit}>Create module</button>
                <span className={moduleFormStyles.close} onClick={()=> setModuleForm(false)}>X</span>
            </div>
        </div>
    )
}

export default ModuleForm