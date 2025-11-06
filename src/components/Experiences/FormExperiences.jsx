import { useState, useRef } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"


function FormExperiences({user,experiencesList, setExperiencesList, experience,setSuccess, setShowModel, onClose }) {
  const [experienceData, setExperienceData]= useState({
        title : experience.length? experience[0].title: '',
        date: experience.length? experience[0].date :'',
        description: experience.length? experience[0].description :'',
        place: experience.length? experience[0].place :'',
        owner: user.user_id
      })
    const modelRef = useRef()
    

    async function handleSubmit(e){
        e.preventDefault()
        try {
          let response = {}
          if (experience.length){
            response = await authRequest(
                            {data: experienceData,
                             method:'put',
                             url:`http://127.0.0.1:8000/ss/profile/experience/${experience[0].id}/`})
            if (response){
            setSuccess('Your Experience Is Updeated Successfully! ')
            // const lastIndex = experiencesList.length()
            setExperiencesList( response.data)
            onClose()
          }
          }else{
            response = await authRequest(
                            {data: experienceData,
                             method:'post',
                             url:`http://127.0.0.1:8000/ss/profile/${user.user_id}/experience/`})
          if (response){
            setSuccess('Your Experience is Added Successfully! ')
            // const lastIndex = experiencesList.length()
            setExperiencesList( response.data)
          }
           }
            console.log(response.data)
            setExperienceData(response.data)
            onClose()
        } catch (err) {
          console.error(err)
          console.log(err.response.data)
            }
        }
        

    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }

    function handleChange(e) {
        setExperienceData({...experienceData, [e.target.name]: e.target.value})
    }
  return (
    <div ref={modelRef} className='FormModelContener'  onClick={closeModel}>
        <div className='innerFormModelContener'>
            <h1 className='Login_sign'>{experience.length? `Edit Your ${experienceData.title} Experience` :'Add New Experience' }</h1>
            <form onSubmit={handleSubmit}>
                <label className="label" htmlFor="title"> Title: </label>
            <input className='input is-rounded ' style={{background:'rgba(136, 126, 126, 0.04)'}} value={experienceData.title} name='title' onChange={handleChange} required/>

            <label className="label" htmlFor="date">Date: </label>
            <div className='control'>
            <input className='input is-rounded ' style={{background:'rgba(136, 126, 126, 0.04)'}} type='date' value={experienceData.date} name='date' onChange={handleChange} required />
            </div>

            <label className="label" htmlFor="description">Description: </label>
            <div className='control'>
            <textarea class="textarea is-rounded " style={{background:'rgba(136, 126, 126, 0.04)'}} value={experienceData.description} name='description' onChange={handleChange} required />
            </div>
            
            <label className="label" htmlFor="place">Place: </label>
            <div className='control'>
            <input className='input is-rounded ' style={{background:'rgba(136, 126, 126, 0.04)'}} value={experienceData.place} name='place' onChange={handleChange} required />
            </div>
            
            <div className="field is-grouped is-grouped-centered">
                  <p className="control">
                    <button className=" submit_form_btn" type='submit'>Save</button>
                  </p>
                  <p className="control">
                    <button className='submit_form_btn' style={{background: 'linear-gradient(to right, #e4e3e3ff, #f5e6f8ff)', color:'#9C27B0'}}  onClick={onClose}>cancel</button>
                  </p>
                  </div>
            </form>
        </div>
    </div>
  )
}

export default FormExperiences