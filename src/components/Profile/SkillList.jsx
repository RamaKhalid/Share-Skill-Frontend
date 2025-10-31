import React from 'react'
import axios from 'axios'
import SkillForm from './SkillForm';
import {useState } from 'react'


function SkillList({profileInfo, setProfileInfo }) {
    const [showForm, setShowForm] =useState(false)
    console.log(profileInfo);    
    async function associateSkill(skillId) {
        const response = await axios.patch(`http://127.0.0.1:8000/ss/profile/${profileInfo.user}/associate-skill/${skillId}/`)
        console.log(response.data.skills_user_does_not_have)
        console.log(response.data.skills_user_does_have)
        setProfileInfo({
            ...profileInfo,
            skills_user_does_not_have: response.data.skills_user_does_not_have,
            skills_user_has: response.data.skills_user_does_have
        })
    }

    async function desocciateSkill(skillId) {
        const response = await axios.patch(`http://127.0.0.1:8000/ss/profile/${profileInfo.user}/dissociate-skill/${skillId}/`)
        console.log(response.data)
        setProfileInfo({
            ...profileInfo,
            skills_user_has: response.data.skills_user_does_have,
            skills_user_does_not_have: response.data.skills_user_does_not_have
        })
    }

    function handleClick(e) {
        e.preventDefault()
            setShowForm(true)
     }

  return (
    <div>

        <h3>Skill You has:</h3>
            {
                profileInfo.skills_user_has
                    ?
                    <ul>
                        {
                            profileInfo.skills_user_has.length
                                ?
                                profileInfo.skills_user_has.map(skill => {
                                    return (
                                        <li>
                                            A {skill.type} {skill.name}
                                            <button onClick={() => { desocciateSkill(skill.id) }}>Delete skill</button>
                                        </li>
                                    )
                                })
                                :
                                <li>No Skill 😢</li>
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
                                        <li>
                                            A {skill.type} {skill.name}
                                            <button onClick={() => { associateSkill(skill.id) }}>Add Skill</button>
                                        </li>
                                    )
                                })
                                :
                                <li>No Skills 😢</li>
                        }
                    </ul>
                    :
                    <p>Loading</p>
            }
            {showForm && <SkillForm  setShowForm={setShowForm} onClose= {()=>setShowForm(false)}/>}
            <button onClick={handleClick}>Add other Skill</button>

    </div>
  )
}

export default SkillList