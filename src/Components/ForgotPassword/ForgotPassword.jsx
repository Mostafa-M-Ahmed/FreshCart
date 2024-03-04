import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    let navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [userMessage, setUserMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)



    async function resetPass(e) {
        e.preventDefault()
        let formData = {
                email: email,
        };
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, formData)
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
                        <h2 className='mb-5'>Please enter your email</h2>
                        {userMessage ? <div className="alert alert-success">{userMessage}</div> : "" }
                        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : "" }
    
                        <form onSubmit={resetPass}>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className='form-control my-3' required placeholder='name@example.com' />
                            <button type='submit' className='btn btn-outline-success'>confirm</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
