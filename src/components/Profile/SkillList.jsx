
import axios from 'axios'
import SkillForm from './SkillForm';
import {useState } from 'react'
import ConfirmAdd from './ConfirmAdd';
import AlertMessage from '../Alert/AlertMessage';
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import { FaPlus, FaTrash } from 'react-icons/fa';




function SkillList({profileInfo, setProfileInfo, user }) {
    const [showForm, setShowForm] =useState(false)
    const [showConfirm, setShowConfirm] =useState(false)
    const [role, setRole]=useState('')
    const [skillData, setSkillData]=useState({
        name:'',
        id: ' '
    })
    const [errors, setErrors] = useState(null)
    const [success, setSuccess] = useState(null)
    
    

    console.log(profileInfo);    
    async function associateSkill(skillId) {
         try {
            if(role){
                console.log(`post: ${role}`);
                
                const response = await authRequest(
                                {data: {'role':role}, 
                                 method:'patch',
                                 url:`http://127.0.0.1:8000/ss/profile/${profileInfo.user}/associate-skill/${skillId}/`})
                console.log(response.data.skills_user_does_not_have)
                console.log(response.data.skills_user_does_have)
                if (response.data){
                    setSuccess('Your Data is Updated Successfully')
                }
                setProfileInfo({
                    ...profileInfo,
                     skills_user_teach: response.data.skills_user_teach,
                    skills_user_learn: response.data.skills_user_learn,
                    skills_user_does_not_have: response.data.skills_user_does_not_have
                })
                
            }
            else{
            console.log(`No: ${role}`);
            }
        } catch (error) {
            console.log(error)
            if (err.response) {
                console.error( err.response.data);
            } else {
                console.error( err.message);
            }
            setErrors(error.response.data.error)
        }
        }

         if (errors) {
        return <h3>{errors}</h3>
    }

    async function desocciateSkill(skillId) {
        try {
        const response = await authRequest(
                                {method:'patch',
                                 url:`http://127.0.0.1:8000/ss/profile/${profileInfo.user}/dissociate-skill/${skillId}/`})
        console.log(response.data)
        if (response.data){
            setSuccess('Your Data is Updated Successfully')

        }
        setProfileInfo({
            ...profileInfo,
            skills_user_teach: response.data.skills_user_teach,
            skills_user_learn: response.data.skills_user_learn,
            skills_user_does_not_have: response.data.skills_user_does_not_have
        })
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.error)
        }
    }

    function handleClick(e) {
        e.preventDefault()
            setShowForm(true)
     }

     function addTeachingSkill(e) {
         e.preventDefault()
         e.target.value
         setSkillData( {...skillData, name: e.target.name, id: e.target.id})
        setShowConfirm(true)
        console.log(e.target.name);
     }


  return (
    <div >
            {success&&!role?<AlertMessage severity_name="success" message={success}/> : '' }
        {role?<AlertMessage severity_name="success" message={`The Skill Is Added To Your ${role} Skill List Successfully`}/> : '' }
        {errors?< AlertMessage severity_name="error" message={errors}/> : '' }
    <div className='skill_container'>
        <div className='teach_container'  >
        <h3 className='skill_title' >Skill You Want to Teach</h3>
            {
                profileInfo.skills_user_teach
                    ?
                    <div  className='skill_list_container'>
                        {
                            profileInfo.skills_user_teach.length
                                ?
                                profileInfo.skills_user_teach.map(skill => {
                                    return (
                                        <button  className='skill_list submit_form_btn' style={{background: 'linear-gradient(to right, #e4e3e3ff, #f5e6f8ff)', color:'#9C27B0'}}   onClick={() => { desocciateSkill(skill.id) }} >
                                            {skill.type} {skill.name} <span style={{margin: 5}}><FaTrash /></span>
                                                
                                        </button>
                                    )
                                })
                                :
                                <li>No Skill Yet</li>
                        }
                    </div>
                    :
                    <p>Loading</p>
            }
        </div>
        

            <div className='learn_container'>
                <h3 className='skill_title'  >Skill You Want To Learn</h3>
                            {
                                profileInfo.skills_user_learn
                                    ?
                                    <div className='skill_list_container'>
                                        {
                                            profileInfo.skills_user_learn.length
                                                ?
                                                profileInfo.skills_user_learn.map(skill => {
                                                    return (
                                                        <button   className='skill_list submit_form_btn' style={{background: 'linear-gradient(to right, #e4e3e3ff, #f5e6f8ff)', color:'#9C27B0'}}  onClick={() => { desocciateSkill(skill.id) }} key={skill.id} >
                                                            {skill.type} {skill.name} <span style={{margin: 5}}><FaTrash /></span>
                                                
                                                        </button>
                                                    )
                                                })
                                                :
                                                <li>No Skill Yet</li>
                                        }
                                    </div>
                                    :
                                    <p>Loading</p>
                            }

            </div>
        <br class="horizontal_line"></br>



        <div className='available_container'>
            <h3 className='skill_title' style={{marginLeft: 387}}>Available Skills:</h3>
                        {
                            profileInfo.skills_user_does_not_have
                                ?
                                <ul className='grid is-col-min-8'>
                                    {showConfirm 
                                        && 
                                    <ConfirmAdd skillData= {skillData} 
                                    associateSkill={associateSkill} 
                                    setRole={setRole}  onClose= {()=>setShowConfirm(false)}/>
                                    }
                                    {
                                        profileInfo.skills_user_does_not_have.length
                                            ?
                                            profileInfo.skills_user_does_not_have.map(skill => {
                                                return (
                                                    <button className='cell skill_list submit_form_btn' style={{background: 'linear-gradient(to right, #e4e3e3ff, #f5e6f8ff)', color:'#9C27B0'}} key={skill.id} id={skill.id}  name={skill.name} onClick={addTeachingSkill}>
                                                        {skill.type} {skill.name} <span style={{margin: 5}}><FaPlus /></span>
                                                    </button>
                                                )
                                            })
                                            :
                                            <li>No Skills Yet</li>
                                    }
                                </ul>
                                :
                                <p>Loading</p>
                        }
        </div>

            
            {showForm && <SkillForm userId= {user.user_id}  onClose= {()=>setShowForm(false)}/>}
            <button  className=' submit_form_btn ' style={{padding:20, marginLeft:80, marginRight:-120}}   onClick={handleClick}>Add other Skill</button>

    </div>
    </div>
  )
}

export default SkillList