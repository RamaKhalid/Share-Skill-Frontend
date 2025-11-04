import { useRef } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"


function DeleteExperiences({setSuccess, experience, experiencesList, setExperiencesList, onClose }) {
    const modelRef = useRef()
    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }    
    async function handleDelete(e) {
        e.preventDefault()
        try {
            const response = await authRequest(
                            {method:'delete',
                             url: `http://127.0.0.1:8000/ss/profile/experience/${experience[0].id}/`})
            // window.location.reload();
            const exp = experiencesList.filter((exp)=> exp.id != experience[0].id)
            setExperiencesList(exp)
            setSuccess(`Your Experience ${experience[0].title} Is  Deteted Successfully!`)
            onClose()
        } catch (err) {
          console.error(err)
          }
        }
        
    
  return (
    <div>
        <div ref={modelRef} className='FormModelContener' onClick={closeModel}>
        <div className='innerFormModelContener'>
            <h1>Are You Sure You want to delete your {experience[0].title} Experience?</h1>
            <button onClick= {handleDelete}>yes</button>
            <button onClick={onClose}>cancel</button>
        </div>
    </div>
    </div>
  )
}

export default DeleteExperiences