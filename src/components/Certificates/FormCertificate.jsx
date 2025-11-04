import { useState, useRef } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import AlertMessage from '../Alert/AlertMessage';




function FormCertificate({user,setSuccess, certificate,setCertificatesList, certificatesList, onClose}) {  
  
    const [certificateData, setCertificates]= useState({
        name : certificate.length? certificate[0].name: '',
        type: certificate.length? certificate[0].type :'',
        owner: user.user_id
      })
      const [errors, setErrors] = useState(null)
      
    // const [certificateData, setCertificates]= useState({
    //     name :'',
    //     type: '',
    //     owner: user.user_id
    //   })
    const modelRef = useRef()

      async function handleSubmit(e){
        e.preventDefault()
        try {
          let response = {}
          if (certificate.length){
             response = await authRequest(
                            {data: certificateData,
                             method:'put',
                             url: `http://127.0.0.1:8000/ss/profile/certificate/${certificate[0].id}/`})
          if (response){
            setSuccess('Your Certificate Is Updeated Successfully! ')
            setCertificatesList(response.data)
            // onClose()
          }
              
          }else{            
             response = await authRequest(
                            {data: certificateData,
                             method:'post',
                             url:`http://127.0.0.1:8000/ss/profile/${user.user_id}/certificate/`})
            if (response){
            setSuccess('Your Certificate is Added Successfully! ')
            setCertificatesList(response.data)
            
          }

          }
            console.log(response.data)
            setCertificates(response.data)
            onClose()
        } catch (err) {
          console.error(err)
          console.log(err.response.data)
          if (err.response.data){
            if(err.response.data.name && !err.response.data.type){
              setErrors('Please Enter a Name for you certificate')
            }
            if(err.response.data.type && !err.response.data.name){
              setErrors('Please Enter a Type For You Certificate')
            }
            if(err.response.data.type && err.response.data.name){
              setErrors('Please Enter a Name and Type For You Certificate')

            }
          }
            
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
            {errors?< AlertMessage severity_name="error" message={errors}/> : '' }
            <h1>{certificate.length? `Edit ${certificateData.name} certificate` :'Add New certificate' }</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name"> Name: </label>
            <input value={certificateData.name} name='name' onChange={handleChange}/>

            <label htmlFor="type">Type: </label>
            <input value={certificateData.type} name='type' onChange={handleChange} />
                <button  type='submit'>Save</button>
                <button onClick={onClose}>cancel</button>
            </form>
        </div>
    </div>
  )
}

export default FormCertificate