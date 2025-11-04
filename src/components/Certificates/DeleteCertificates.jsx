import { useRef } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"



function DeleteCertificates({user, certificate, setSuccess, onClose}) {
    console.log(certificate);
    
    const modelRef = useRef()
    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }
    console.log(certificate);
    
    async function handleDelete(e) {
        e.preventDefault()
        try {
            const response = await authRequest(
                            {method:'delete',
                             url: `http://127.0.0.1:8000/ss/profile/certificate/${certificate[0].id}/`})
            console.log(response.data)
            // setCertificate(response.data)
            // window.location.reload();
            const exp = experiencesList.filter((exp)=> exp.id != experience[0].id)
            setExperiencesList(exp)
            setSuccess(`Your Certificate ${certificate[0].name} Is Deteted Successfully!`)
            onClose()
        } catch (err) {
          console.error(err)
          console.log(err.response.data)
          }
        }
        
    
  return (
    <div>
        <div ref={modelRef} className='FormModelContener' onClick={closeModel}>
        <div className='innerFormModelContener'>
            <h1>Are You Sure You want to delete your {certificate[0].name} Certificate?</h1>
            <button onClick= {handleDelete}>yes</button>
            <button onClick={onClose}>cancel</button>
        </div>
    </div>
    </div>
  )
}

export default DeleteCertificates