import { useState, useRef } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"




function FormCertificate({user, certificate, setShowModel, onClose}) {  
  console.log(certificate);
  
    const [certificateData, setCertificates]= useState({
        name : certificate.length? certificate[0].name: '',
        type: certificate.length? certificate[0].type :'',
        owner: user.user_id
      })
    // const [certificateData, setCertificates]= useState({
    //     name :'',
    //     type: '',
    //     owner: user.user_id
    //   })
    const modelRef = useRef()

      async function handleSubmit(e){

        try {
          let response = {}
          if (certificate.length){
            response = await authRequest(
                            {data: certificateData,
                             method:'put',
                             url: `http://127.0.0.1:8000/ss/profile/certificate/${certificate[0].id}/`})
          }else{
            console.log('poooosssttt');
            
            response = await authRequest(
                            {data: certificateData,
                             method:'post',
                             url:`http://127.0.0.1:8000/ss/profile/${user.user_id}/certificate/`})

          }
            console.log(response.data)
            setCertificates(response.data)
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
        setCertificates({...certificateData, [e.target.name]: e.target.value})
    }
  return (
    <div ref={modelRef} className='FormModelContener' onClick={closeModel}>
        <div className='innerFormModelContener'>
            <h1>{certificate.length? `Edit ${certificateData.name} certificate` :'Add New certificate' }</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name"> Name: </label>
            <input value={certificateData.name} name='name' onChange={handleChange}/>

            <label htmlFor="type">Type Name: </label>
            <input value={certificateData.type} name='type' onChange={handleChange} />
                <button  type='submit'>Save</button>
                <button onClick={onClose}>cancel</button>
            </form>
        </div>
    </div>
  )
}

export default FormCertificate