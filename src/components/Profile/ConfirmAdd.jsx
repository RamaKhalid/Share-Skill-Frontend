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
            <h1 className='Login_sign'>Are you Going to Teach or to Learn {skillData.name} skill?</h1>
            <form onSubmit={handleSubmit}>
              <div class="select is-rounded" style={{background:'rgba(136, 126, 126, 0.04)', width:250}}>
            <select value={skill} name='role' onChange={handleChange} style={{background:'rgba(136, 126, 126, 0.04)', width:250}} >
              <option value="Teach">Teach</option>
              <option value="Learn">Learn</option>
              </select>
              </div>
              <div className="field is-grouped is-grouped-centered">
                  <p className="control">
                    <button className=" submit_form_btn"  onClick={(e)=>setRole(skill)} type='submit'>Save</button>
                  </p>
                  <p className="control">
                      <button className='submit_form_btn' style={{background: 'linear-gradient(to right, #e4e3e3ff, #f5e6f8ff)', color:'#9C27B0'}} onClick={onClose}>cancel</button>
                  </p>
                  </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default ConfirmAdd