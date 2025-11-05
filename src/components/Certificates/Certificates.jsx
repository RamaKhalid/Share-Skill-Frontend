import React from 'react'
import "./CertificatesStyle.css"
import { useEffect, useState } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import FormCertificate from './FormCertificate'
import DeleteCertificates from './DeleteCertificates'
import AlertMessage from '../Alert/AlertMessage'




function Certificates({user}) {
    const [certificatesList, setCertificatesList]= useState([])
    const [onecertificate, setOneCertificate]= useState([])
    const [showModal, setShowModel] =useState(false)
    const [showDelete, setShowDelete] =useState(false)
    const [success, setSuccess] = useState(null)
console.log(user.user_id);

    async function getAllCertificates() {
        const response =await authRequest(
                            {method:'get',
                             url: `http://127.0.0.1:8000/ss/profile/${user.user_id}/certificate/`})
        console.log(response.data)
        console.log(response.error);
        
        setCertificatesList(response.data)
    }
    useEffect(() => {
        getAllCertificates()
    }, [])


    function handleClick(e) {
        e.preventDefault()
        const certificate = certificatesList.filter((certificate)=> certificate.id == e.target.value)
        setOneCertificate(certificate)
        if (e.target.name === 'edit' || e.target.name === 'addNew' ){
            console.log(e.target.name);
            setShowModel(true)
        }
        if (e.target.name === 'delete'){
            setShowDelete(true)
        }
    }
    
    return (
        <div>
        
        <div className="cards_container">
        <h1 className='profile_title'>Your Certificates ✨ </h1>

        <ul className="cards">
            
            {showModal && < FormCertificate user={user} setCertificatesList={setCertificatesList} certificatesList={certificatesList} setSuccess={setSuccess} certificate={onecertificate} onClose= {()=>setShowModel(false)}  />}
            {showDelete && < DeleteCertificates user={user} setCertificatesList={setCertificatesList} certificatesList={certificatesList} setSuccess={setSuccess} certificate={onecertificate}  onClose= {()=>setShowDelete(false)} />}
            {success?<AlertMessage severity_name="success" message={success}/> : '' }
            {
                certificatesList.length
                ?
                certificatesList.map(certificate=>{
                    return(
                        <li key={certificate.id}>
                            <a href="" className="card">
                                <img src="src\assets\images\certificate.png" className="card__image" alt="" />
                                <div className="card__overlay">
                                    <div className="card__header">
                                    {/* <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                      */}
                                    {/* <img className="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" /> */}
                                    <div className="card__header-text">
                                        <h3 className="card__title" >{certificate.name}</h3>            
                                        <span className="card__status">{certificate.type}</span>

                                    </div>
                                    </div>
                                    <div class="field is-grouped is-grouped-centered">
                                        <p class="control">
                                            <button className=" submit_form_btn" onClick={handleClick} value={certificate.id} name='edit'>Edit</button>
                                        </p>
                                        <p class="control">
                                            <button className='submit_form_btn' onClick={handleClick} value={certificate.id} name='delete'>Delete</button>
                                        </p>
                                    </div>
                                </div>
                            </a>      
                        </li>
                    )
                })
                :
                <li>
                    <div className="card">
                        <h3 className="card__title">No Certificate Yet</h3>               
                    </div>      
                </li>
            }
            
        </ul>
            <button name='addNew' className=" submit_form_btn" onClick={handleClick}>Add New Certificate</button>
        </div>
    </div>
  )
}

export default Certificates



