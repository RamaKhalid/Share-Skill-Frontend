import React from 'react'
import { useEffect, useState } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import FormExperiences from './FormExperiences'
import DeleteExperiences from './DeleteExperiences'
import AlertMessage from '../Alert/AlertMessage'

function ExperiencesList({user}) {
    const [experiencesList, setExperiencesList]= useState([])
    const [oneExperiences, setOneExperiences]= useState([])
    const [showForm, setShowForm] =useState(false)
    const [showDelete, setShowDelete] =useState(false)
    const [success, setSuccess] = useState(null)
    

    async function getAllExperience() {
        const response = await authRequest(
                            {method:'get',
                             url: `http://127.0.0.1:8000/ss/profile/${user.user_id}/experience/`})
        console.log(response.data)
        // console.log(response.error);
        
        setExperiencesList(response.data)
    }
    useEffect(() => {
            getAllExperience()
    }, [])


    function handleClick(e) {
        e.preventDefault()
        console.log(e.target);
        
        const experience = experiencesList.filter((experience)=> experience.id == e.target.value)
        setOneExperiences(experience)
        if (e.target.name === 'edit' || e.target.name === 'addNew' ){
            setShowForm(true)
            console.log(typeof experiencesList);
        }
        if (e.target.name === 'delete'){
            setShowDelete(true)
        }
    }
    
    return (
        <div>
        
        <div className="cards_container">
        <h1 className='profile_title'>Your Experiences </h1>
            {showDelete && < DeleteExperiences user={user}  experience={oneExperiences} experiencesList={experiencesList} setExperiencesList={setExperiencesList}  setSuccess={setSuccess} onClose= {()=>setShowDelete(false)} />}
            {showForm && < FormExperiences user={user} experiencesList={experiencesList} setExperiencesList={setExperiencesList} setSuccess={setSuccess} experience={oneExperiences} setShowForm={setShowForm} onClose= {()=>setShowForm(false)}  />}
            {success? <AlertMessage severity_name="success" message={success}/> : '' }
            
        <ul className="cards">
            {
                experiencesList.length
                ?
                experiencesList.map(experiences=>{
                    return(
                        <li key={experiences.id}>
                            <div className="card">
                                <img src="src\assets\images\rating.png" className="card__image" alt="" />
                                <div className="card__overlay">
                                    <div className="card__header">
                                    {/* <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                      */}
                                    {/* <img className="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" /> */}
                                    <div className="card__header-text">
                                        <h3 className="card__title" >{experiences.title}</h3>            
                                        <span className="card__status">{experiences.date} - {experiences.place}</span>
                                    </div>
                                    </div>
                                    <p className="card__description">{experiences.description}</p>

                                    <div class="field is-grouped is-grouped-centered">
                                        <p class="control">
                                            <button className=" submit_form_btn" onClick={handleClick} value={experiences.id} name='edit'>Edit</button>
                                        </p>
                                        <p class="control">
                                           <button className='submit_form_btn' style={{background: 'linear-gradient(to right, #e4e3e3ff, #f5e6f8ff)', color:'#9C27B0'}} onClick={handleClick} value={experiences.id} name='delete'>Delete</button>
                                        </p>
                                    </div>
                                </div>
                            </div>      
                        </li>
                    )
                })
                :
                <li>
                    <div className="card">
                        {/* <div className="card__overlay"> */}
                            <h3 className="card__title">No Experiences Yet</h3>            
                        
                        {/* </div> */}
                    </div>      
                </li>
            }
        </ul>
            <button name='addNew' className=" submit_form_btn" onClick={handleClick}>Add New Experiences</button>
        </div>
    </div>
  )
}

export default ExperiencesList