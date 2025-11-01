import { useState, useRef } from 'react'
import axios from 'axios'


function SkillForm({onClose, userId}) {
    const [skill, setSkill]= useState({
        type: '',
        name: '',
        role : 'Teach'
    })

    const modelRef = useRef()

    async function handleSubmit(e){
        // e.preventDefault()
        console.log(userId);
        try {        
          console.log(skill.role);
          
            response = await axios.post(`http://127.0.0.1:8000/ss/skills/${userId}`, skill)
            console.log(response.data)
            setSkill(response.data)
            setShowModel(false)
          
        } catch (err) {
          if (err.response && err.response.status === 400) {
          alert('Skill alrady exist')
          }
          console.error(err.response)
          console.log(err.response)
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