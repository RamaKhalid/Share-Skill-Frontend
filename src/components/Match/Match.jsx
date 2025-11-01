import {useEffect, useState, useRef } from 'react'
import axios from 'axios'
import MatchForm from './MatchForm'

function Match({user}) {
const [showForm, setShowForm] =useState(false)
 const [profileInfo, setProfileInfo] = useState({
        birth_date: '',
        Level : '',
        phone: '',
        skills_user_teach: [],
        skills_user_learn: [],
        skills_user_does_not_have:[]

    })

    
    
    const [errors, setErrors] = useState(null)
async function getUserProfile() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/ss/profile/${user.user_id}`)
            console.log(response.data)
            setProfileInfo(response.data.profile)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.error)
        }
    }
    useEffect(() => {
        getUserProfile()
    }, [])
    
    if (errors) {
        return <h3>{errors}</h3>
    }

function handleClick(e) {
        e.preventDefault()
            setShowForm(true)
     }
    
  return (
    <div>
        {showForm &&<MatchForm user={user} profileInfo={profileInfo} onClose= {()=>setShowForm(false)}/>}        
            <button onClick={handleClick}>Make Match</button>
    </div>
  )
}

export default Match