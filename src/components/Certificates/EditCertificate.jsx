import { useState, useRef } from 'react'
import axios from 'axios'



function EditCertificate({user, certificate, setShowModel, onClose}) {  
    const [certificates, setCertificate]= useState({
        name :certificate.name,
        type: certificate.type,
        owner: user.user_id
      })
    const modelRef = useRef()

      async function handleSubmit(e){
        try {
        const response = await axios.put(`http://127.0.0.1:8000/ss/profile/certificate/${certificate.id}/`, certificates)
            console.log(response.data)
            setCertificate(response.data)

            setShowModel(false)


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
        setCertificate({...certificates, [e.target.name]: e.target.value})
    }
  return (
    <div ref={modelRef} className='EditModelContener' onClick={closeModel}>
        <div className='innerEditModelContener'>
            <h1>Edit</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name"> Name: </label>
            <input value={certificates.name} name='name' onChange={handleChange}/>

            <label htmlFor="type">Type Name: </label>
            <input value={certificates.type} name='type' onChange={handleChange} />
                <button  type='submit'>Save</button>
                <button onClick={onClose}>cancel</button>
            </form>
        </div>
    </div>
  )
}

export default EditCertificate