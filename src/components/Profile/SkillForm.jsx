import { useState, useRef } from 'react'
import axios from 'axios'
import AlertMessage from '../Alert/AlertMessage'


function SkillForm({onClose, userId}) {
    const modelRef = useRef()
    const [skill, setSkill]= useState({
        type: '',
        name: '',
        role : 'Teach'
    })

    const [errors, setErrors] = useState(null)


    async function handleSubmit(e){
        e.preventDefault()
        console.log(userId);
        try {        
          console.log(skill.role);
            const response = await axios.post(`http://127.0.0.1:8000/ss/skills/${userId}`, skill)
            console.log(response.data)
            setSkill(response.data)
            onClose()
          
        } catch (err) {
          if (err.response && err.response.status === 400) {
          setErrors('Skill alrady exist')
          }
          if (err.response) {
                console.error( err.response.data.non_field_errors[0]);
                if (err.response.data.non_field_errors[0] =='fields type, name must make a unique set'){
                  setErrors('Skill alrady exist')
                }
            } else {
                console.error( err.message);
            }
            }
        }
        

    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }

    function handleChange(e) {
        setSkill({...skill, [e.target.name]: e.target.value})
    }
    
  return (
    <div>
        <div ref={modelRef} className='FormModelContener' onClick={closeModel}>
        <div className='innerFormModelContener'>
      {errors?< AlertMessage severity_name="error" message={errors}/> : '' }
            <h1>Add New Skill</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="type"> Type: </label>
            <input value={skill.type} name='type' onChange={handleChange}/>

            <label htmlFor="name">Name: </label>
            <input value={skill.name} name='name' onChange={handleChange} />

            <label htmlFor="role">Role: </label>
            <select value={skill.role} name='role' onChange={handleChange} >
              <option value="Teach">Teach</option>
              <option value="Learn">Learn</option>
              </select>
            
                <button  type='submit'>Save</button>
                <button onClick={onClose}>cancel</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default SkillForm