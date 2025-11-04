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
        
        <ul className="cards">
            {showDelete && < DeleteExperiences user={user}  experience={oneExperiences} experiencesList={experiencesList} setExperiencesList={setExperiencesList}  setSuccess={setSuccess} onClose= {()=>setShowDelete(false)} />}
            {showForm && < FormExperiences user={user} experiencesList={experiencesList} setExperiencesList={setExperiencesList} setSuccess={setSuccess} experience={oneExperiences} setShowForm={setShowForm} onClose= {()=>setShowForm(false)}  />}
            {success? <AlertMessage severity_name="success" message={success}/> : '' }
            
            {
                experiencesList.length
                ?
                experiencesList.map(experiences=>{
                    return(
                        <li key={experiences.id}>
                            <a href="" className="card">
                                <img src="https://i.imgur.com/oYiTqum.jpg" className="card__image" alt="" />
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
                                    <button className="card__description" onClick={handleClick} value={experiences.id} name='edit'>Edit</button>
                                    <button className="card__description" onClick={handleClick} value={experiences.id} name='delete'>Delete</button>
                                </div>
                            </a>      
                        </li>
                    )
                })
                :
                <li>
                    <a href="" className="card">
                        <div className="card__overlay">
                            <div className="card__header">
                                <h3 className="card__title">No Experiences Yet</h3>            
                            </div>
                        </div>
                    </a>      
                </li>
            }
            
            <button name='addNew' className="card__status" onClick={handleClick}>Add New Experiences</button>
        </ul>
    </div>
  )
}

export default ExperiencesList