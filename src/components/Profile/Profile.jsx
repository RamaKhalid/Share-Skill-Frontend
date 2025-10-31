import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SkillList from './SkillList'

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
        skills_user_has: [],
        skills_user_does_not_have:[]

    })
    // const [userAge, setUserAge] = useState('')
    const [errors, setErrors] = useState(null)
    const [updateData, setUpdateData] = useState([])

    async function getUserProfile() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/ss/profile/${user.user_id}`)
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

    const age =()=>{
        let today = new Date();
        let birthDay = new Date(profileInfo.birth_date)
        let age = today.getFullYear() -birthDay.getFullYear() 
        let month = today.getMonth() - birthDay.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDay.getDate())) 
        {
            age--;
        }
        if (age){
            console.log(age);
            return (age)

        }
        
    }

    async function handleSubmit(e){
        e.preventDefault()
    try {
        console.log(profileInfo);
        await axios.put(`http://127.0.0.1:8000/ss/profile/${user.user_id}/`,profileInfo)
        await axios.put(`http://127.0.0.1:8000/ss/user/${user.user_id}/`,userInfo)
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
    <div>
        <h1>Welcom {userInfo.first_name} {userInfo.last_name} </h1>
         <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input value={userInfo.username} name='username' onChange={handleUserChange} />

            <label htmlFor="first_name">First Name: </label>
            <input value={userInfo.first_name} name='first_name' onChange={handleUserChange}/>

            <label htmlFor="last_name">Last Name: </label>
            <input value={userInfo.last_name} name='last_name' onChange={handleUserChange} />

            <label htmlFor="birth_date"> Age:  </label>
            <input placeholder={age()} name='birth_date' readOnly/>

            <label htmlFor="level" >Level: </label>
            <select value={profileInfo.level} onChange={handleProfilChange} name='level' >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
            </select>

            <label htmlFor="phone"  >Phone number: </label>
            <input type='phone' name='phone' value={profileInfo.phone} onChange={handleProfilChange}/>

            <label htmlFor="email">Email: </label>
            <input type='email' value={userInfo.email} name='email' onChange={handleUserChange} />
            <button type='submit'>Save</button>
         </form>
         <div>
            < SkillList profileInfo= {profileInfo} setProfileInfo = {setProfileInfo} />
         </div>
        
    </div>
  )
}

export default Profile