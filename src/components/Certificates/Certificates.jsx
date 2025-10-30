import React from 'react'
import "./CertificatesStyle.css"
import { useEffect, useState } from 'react'
import axios from 'axios'
import FormCertificate from './FormCertificate'
import DeleteCertificates from './DeleteCertificates'



function Certificates({user}) {
    const [certificates, setCertificates]= useState([])
    const [onecertificate, setOneCertificate]= useState([])
    const [showModal, setShowModel] =useState(false)
    const [showDelete, setShowDelete] =useState(false)
console.log(user.user_id);

    async function getAllCertificates() {
        const response = await axios.get(`http://127.0.0.1:8000/ss/profile/${user.user_id}/certificate/`)
        console.log(response.data)
        console.log(response.error);
        
        setCertificates(response.data)
    }
    useEffect(() => {
        getAllCertificates()
    }, [])


    function handleClick(e) {
        e.preventDefault()
        const certificate = certificates.filter((certificate)=> certificate.id == e.target.value)
        setOneCertificate(certificate)
        if (e.target.name === 'edit' || e.target.name === 'addNew' ){
            setShowModel(true)
        }
        if (e.target.name === 'delete'){
            setShowDelete(true)
        }
    }
    
    return (
        <div>
        
        <ul className="cards">
            {
                certificates.length
                ?
                certificates.map(certificate=>{
                    return(
                        <li>
                            {showDelete && < DeleteCertificates user={user} certificate={onecertificate} setShowModel={setShowDelete} onClose= {()=>setShowDelete(false)} />}
                            {showModal && < FormCertificate user={user} certificate={onecertificate} setShowModel={setShowModel} onClose= {()=>setShowModel(false)}  />}
                            <a href="" className="card">
                                <img src="https://i.imgur.com/oYiTqum.jpg" className="card__image" alt="" />
                                <div className="card__overlay">
                                    <div className="card__header">
                                    {/* <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                      */}
                                    {/* <img className="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" /> */}
                                    <div className="card__header-text">
                                        <h3 className="card__title" >{certificate.name}</h3>            
                                        <span className="card__status">{certificate.type}</span>

                                    </div>
                                    </div>
                                    <button className="card__description" onClick={handleClick} value={certificate.id} name='edit'>Edit</button>
                                    <button className="card__description" onClick={handleClick} value={certificate.id} name='delete'>Delete</button>
                                </div>
                            </a>      
                        </li>
                    )
                })
                :
                <li>
                    <a href="" className="card">
                        <div className="card__overlay">
                            <div className="card__header">
                                <h3 className="card__title">No Certificate Yet</h3>            
                            </div>
                        </div>
                    </a>      
                </li>
            }
            
            <button name='addNew' className="card__status" onClick={handleClick}>Add New Certificate</button>
        </ul>
    </div>
  )
}

export default Certificates



