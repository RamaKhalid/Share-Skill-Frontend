import { useState, useRef } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
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
            const response = await authRequest(
                                      {data:skill,
                                        method:'post',
                                       url:`http://127.0.0.1:8000/ss/skills/${userId}`})
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
            <h1 className='Login_sign'>Add New Skill</h1>
            <form onSubmit={handleSubmit}>
                <label className="label" htmlFor="type"> Type: </label>
            <input className='input is-rounded ' style={{background:'rgba(136, 126, 126, 0.04)'}}  value={skill.type} name='type' onChange={handleChange}/>

            <label className="label" htmlFor="name">Name: </label>
            <input className='input is-rounded ' style={{background:'rgba(136, 126, 126, 0.04)'}}  value={skill.name} name='name' onChange={handleChange} />

            <label className="label" htmlFor="role">Role: </label>
            <div class="select is-rounded" style={{background:'rgba(136, 126, 126, 0.04)'}}>
              <select value={skill.role} name='role' onChange={handleChange} style={{background:'rgba(136, 126, 126, 0.04)'}}>
                <option value="Teach">Teach</option>
                <option value="Learn">Learn</option>
                </select>
            </div>
            <div className="field is-grouped is-grouped-centered">
                  <p className="control">
                      <button className='submit_form_btn'  type='submit'>Save</button>
                  </p>
                  <p className="control">
                      <button className='submit_form_btn'style={{background: 'linear-gradient(to right, #e4e3e3ff, #f5e6f8ff)', color:'#9C27B0'}}   onClick={onClose}>cancel</button>
                  </p>
                  </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default SkillForm