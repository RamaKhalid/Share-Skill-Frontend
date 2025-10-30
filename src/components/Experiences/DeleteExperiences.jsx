import { useRef } from 'react'
import axios from 'axios'

function DeleteExperiences({user, experience, setShowModel, onClose }) {
    const modelRef = useRef()
    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }    
    async function handleDelete(e) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/ss/profile/experience/${experience[0].id}/`)
            window.location.reload();
            setShowModel(false)
        } catch (err) {
          console.error(err)
          }
        }
        
    
  return (
    <div>
        <div ref={modelRef} className='EditModelContener' onClick={closeModel}>
        <div className='innerEditModelContener'>
            <h1>Are You Sure You want to delete your {experience[0].title} Experience?</h1>
            <button onClick= {handleDelete}>yes</button>
            <button onClick={onClose}>cancel</button>
        </div>
    </div>
    </div>
  )
}

export default DeleteExperiences