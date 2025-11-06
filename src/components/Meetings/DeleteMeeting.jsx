import { useRef } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"



function DeleteMeeting({ meetingId, onClose }) {
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
            <h1 className='Login_sign'>Are You Sure You want to delete your Meeting?</h1>
            <div className="field is-grouped is-grouped-centered">
                  <p className="control">
                    <button className=" submit_form_btn" onClick= {handleDelete}>yes</button>
                  </p>
                  <p className="control">
                    <button className='submit_form_btn' style={{background: 'linear-gradient(to right, #e4e3e3ff, #f5e6f8ff)', color:'#9C27B0'}} onClick={onClose}>cancel</button>
                  </p>
                  </div>
        </div>
    </div>
    </div>
  )
}

export default DeleteMeeting