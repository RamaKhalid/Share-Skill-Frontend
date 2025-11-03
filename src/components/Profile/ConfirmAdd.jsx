import { useState, useRef } from 'react'


function ConfirmAdd({onClose,associateSkill ,setRole, skillData}) {
    const [skill, setSkill]= useState('Teach')

   
  console.log(skillData);
  
    const modelRef = useRef()

    async function handleSubmit(e){
        e.preventDefault()
        console.log(skill);
        setRole(skill)
        associateSkill(skillData.id)
        onClose()
        }
        

    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }

    function handleChange(e) {
        setSkill(e.target.value)
        console.log(e.target.value);

    }

  return (
    <div>
        <div ref={modelRef} className='FormModelContener' onClick={closeModel}>
        <div className='innerFormModelContener'>
            <h1>Are you Going to Teach or to Learn {skillData.name} skill?</h1>
            <form onSubmit={handleSubmit}>
            <select value={skill} name='role' onChange={handleChange} >
              <option value="Teach">Teach</option>
              <option value="Learn">Learn</option>
              </select>
                <button onClick={(e)=>setRole(skill)} type='submit'>Save</button>
                <button onClick={onClose}>cancel</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default ConfirmAdd