import {useEffect, useState, useRef } from 'react'
import axios from 'axios'
import MatchForm from './MatchForm'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import "./match.css"

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
            const response = await authRequest(
                            {method:'get',
                             url: `http://127.0.0.1:8000/ss/profile/${user.user_id}`})
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
    <div className='match_btn_contener'>
        {showForm &&<MatchForm user={user} profileInfo={profileInfo} onClose= {()=>setShowForm(false)}/>}        
            <button className="find_match_button"  onClick={handleClick}>Find Your Match</button>
    </div>
  )
}

export default Match