import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    let navigate = useNavigate()

    const [resetCode, setResetCode] = useState("")
    const [userMessage, setUserMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)



    async function verifyCode(e) {
        e.preventDefault()
        let formData = {
                resetCode: resetCode,
        };
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formData)
            if (data.statusMsg == "success") {
                setUserMessage(data.message)
                navigate("/verify-code")
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <>
            <div className="mt-5 d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="w-75 m-auto">
                        <h2 className='mb-5'>Please enter the verification code </h2>
                        {userMessage ? <div className="alert alert-success">{userMessage}</div> : "" }
                        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : "" }
    
                        <form onSubmit={verifyCode}>
                            <input onChange={(e) => setResetCode(e.target.value)} type="email" className='form-control my-3' required placeholder='Type verification code here' />
                            <button type='submit' className='btn btn-outline-success'>verify</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
