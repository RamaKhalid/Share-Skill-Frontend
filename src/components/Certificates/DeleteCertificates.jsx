import { useRef } from 'react'

import axios from 'axios'


function DeleteCertificates({user, certificate, setShowModel, onClose}) {
    
    const modelRef = useRef()
    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }
    console.log(certificate);
    
    async function handleDelete(e) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/ss/profile/certificate/${certificate.id}/`)
            console.log(response.data)
            // setCertificate(response.data)
            setShowModel(false)
        } catch (err) {
          console.error(err)
          console.log(err.response.data)
          }
        }
        
    
  return (
    <div>
        <div ref={modelRef} className='EditModelContener' onClick={closeModel}>
        <div className='innerEditModelContener'>
            <h1>Are You Sure You want to delete?</h1>
            <button onClick= {handleDelete}>yes</button>
            <button onClick={onClose}>cancel</button>
        </div>
    </div>
    </div>
  )
}

export default DeleteCertificates