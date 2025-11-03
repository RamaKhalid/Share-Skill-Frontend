import { useRef } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"



function DeleteMeeting({user, meetingId, onClose }) {
    const modelRef = useRef()

    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }    
    async function handleDelete(e, id ) {
        try {        
                const response = await authRequest(
                            {method:'delete',
                             url:`http://127.0.0.1:8000/ss/meeting/${meetingId}/`})
                window.location.reload();
                onClose()
            } catch (err) {
              if (err.response) {
                    console.error( err.response.data);
                } else {
                    console.error( err.message);
                }
                }
            }
        
    
  return (
    <div>
        <div ref={modelRef} className='FormModelContener' onClick={closeModel}>
        <div className='innerFormModelContener'>
            <h1>Are You Sure You want to delete your Meeting?</h1>
            <button onClick= {handleDelete}>yes</button>
            <button onClick={onClose}>cancel</button>
        </div>
    </div>
    </div>
  )
}

export default DeleteMeeting