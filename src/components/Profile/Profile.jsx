import React from 'react'
import { useEffect, useState } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import SkillList from './SkillList'
import Alert from '@mui/material/Alert';
import "./profile.css"


function Profile({user}) {
    const [userInfo, setUserInfo] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
            })

    const [profileInfo, setProfileInfo] = useState({
        birth_date: '',
        Level : '',
        phone: '',
        skills_user_teach: [],
        skills_user_learn: [],
        skills_user_does_not_have:[]

    })
    
    const [errors, setErrors] = useState(null)
    const [success, setSuccess] = useState(null)
    

    async function getUserProfile() {
        try {
            const response = await authRequest(
                {method:'get',
                 url: `http://127.0.0.1:8000/ss/profile/${user.user_id}`})
            console.log(response.data)
            setUserInfo(response.data.user)
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

    

    async function handleSubmit(e){
        e.preventDefault()
    try {
        console.log(profileInfo);
        const profile = await authRequest(
                {data: profileInfo, 
                 method:'put',
                 url:`http://127.0.0.1:8000/ss/profile/${user.user_id}/`})
        const User = await authRequest(
                {data: userInfo,
                 method:'put',
                 url:`http://127.0.0.1:8000/ss/user/${user.user_id}/`})
        if(profile && user){
            setSuccess('Your Data is Updated Successfully')

        }
    } catch (err) {
      console.error(err)
      console.log(err.response.data)
    
    }
}

function handleProfilChange(e) {
        setProfileInfo({...profileInfo, [e.target.name]: e.target.value})
    }

function handleUserChange(e) {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }

   
    return (
    <div >
        <div className='profile_container'>
            <dive>
        <h1 className='profile_title'>Welcom {userInfo.first_name} {userInfo.last_name} </h1>
            {success?<Alert severity="success">{success}</Alert> : '' }
         <form className='profile_form1' onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input className='profile_input' value={userInfo.username} name='username' onChange={handleUserChange} />

            <label htmlFor="first_name">First Name: </label>
            <input className='profile_input' value={userInfo.first_name} name='first_name' onChange={handleUserChange}/>

            <label htmlFor="last_name">Last Name: </label>
            <input className='profile_input' value={userInfo.last_name} name='last_name' onChange={handleUserChange} />

            <label htmlFor="birth_date"> Birth Date:  </label>
            <input className='profile_input' value={userInfo.birth_date} type='date' name='birth_date' onChange={handleUserChange} />

            <label  htmlFor="level" >Level: </label>
            <select className='profile_input' value={profileInfo.level} onChange={handleProfilChange} name='level' >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
            </select>

            <label htmlFor="phone"  >Phone number: </label>
            <input className='profile_input' type='phone'  pattern="[0][5][0-9]{8}" name='phone' value={profileInfo.phone} onChange={handleProfilChange}/>

            <label htmlFor="email">Email: </label>
            <input className='profile_input' type='email' value={userInfo.email} name='email' onChange={handleUserChange} />
            <button className='profile_submit' type='submit'>Save</button>
         </form> 
            </dive>
    
         </div>

         <div className='profile_container'>
            < SkillList user= {user} profileInfo= {profileInfo} setProfileInfo = {setProfileInfo} />
         </div>
        
        
    </div>
  )
}

export default Profile