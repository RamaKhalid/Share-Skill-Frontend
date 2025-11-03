
import axios from 'axios'
import SkillForm from './SkillForm';
import {useState } from 'react'
import ConfirmAdd from './ConfirmAdd';
import AlertMessage from '../Alert/AlertMessage';
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"

// import Alert from '@mui/material/Alert';



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
    <div>
        {success?<AlertMessage severity_name="success" message={success}/> : '' }
        {errors?< AlertMessage severity_name="error" message={errors}/> : '' }
        <h3>Skill You Teach:</h3>
            {
                profileInfo.skills_user_teach
                    ?
                    <ul>
                        {
                            profileInfo.skills_user_teach.length
                                ?
                                profileInfo.skills_user_teach.map(skill => {
                                    return (
                                        <li key={skill.id}>
                                            {skill.type} {skill.name}
                                            <button onClick={() => { desocciateSkill(skill.id) }}>Delete skill</button>
                                        </li>
                                    )
                                })
                                :
                                <li>No Skill Yet</li>
                        }
                    </ul>
                    :
                    <p>Loading</p>
            }



            <h3>Skill You Want To Learn:</h3>
            {
                profileInfo.skills_user_learn
                    ?
                    <ul>
                        {
                            profileInfo.skills_user_learn.length
                                ?
                                profileInfo.skills_user_learn.map(skill => {
                                    return (
                                        <li key={skill.id}>
                                             {skill.type} {skill.name}
                                            <button onClick={() => { desocciateSkill(skill.id) }}>Delete skill</button>
                                        </li>
                                    )
                                })
                                :
                                <li>No Skill Yet</li>
                        }
                    </ul>
                    :
                    <p>Loading</p>
            }




            <h3>Available Skills:</h3>
            {
                profileInfo.skills_user_does_not_have
                    ?
                    <ul>
                        {
                            profileInfo.skills_user_does_not_have.length
                                ?
                                profileInfo.skills_user_does_not_have.map(skill => {
                                    return (
                                        <li key={skill.id}>
                                             {skill.type} {skill.name}
                                            {showConfirm 
                                                && 
                                            <ConfirmAdd skillData= {skillData} 
                                            associateSkill={associateSkill} 
                                            setRole={setRole}  onClose= {()=>setShowConfirm(false)}/>
                                            }
                                            <button id={skill.id}  name={skill.name} onClick={addTeachingSkill}>Add Skill</button>
                                        </li>
                                    )
                                })
                                :
                                <li>No Skills Yet</li>
                        }
                    </ul>
                    :
                    <p>Loading</p>
            }
            {showForm && <SkillForm userId= {user.user_id}  onClose= {()=>setShowForm(false)}/>}
            <button onClick={handleClick}>Add other Skill</button>

    </div>
  )
}

export default SkillList