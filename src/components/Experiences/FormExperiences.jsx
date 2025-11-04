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
    const [lastIndex, setLastIndex] = useState (experiencesList.length)
    // console.log(lastIndex);
    

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
    <div ref={modelRef} className='FormModelContener' onClick={closeModel}>
        <div className='innerFormModelContener'>
            <h1>{experience.length? `Edit Your ${experienceData.title} Experience` :'Add New Experience' }</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title"> Title: </label>
            <input value={experienceData.title} name='title' onChange={handleChange} required/>

            <label htmlFor="date">Date: </label>
            <input type='date' value={experienceData.date} name='date' onChange={handleChange} required />

            <label htmlFor="description">Description: </label>
            <textarea value={experienceData.description} name='description' onChange={handleChange} required />
            
            <label htmlFor="place">Place: </label>
            <input value={experienceData.place} name='place' onChange={handleChange} required />
            
                <button  type='submit'>Save</button>
                <button onClick={onClose}>cancel</button>
            </form>
        </div>
    </div>
  )
}

export default FormExperiences