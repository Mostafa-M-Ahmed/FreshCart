import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UpdatePassword() {
    let navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [userMessage, setUserMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)





    let mySchema = Yup.object({
        email: Yup.string().email('Email not valid').required('Required'),
        newPassword: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password not valid (Minimum eight characters, at least one letter, one number and one special character)").required('Required'),


    })

    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        validationSchema: mySchema,
        onSubmit: (values) => {
            UpdatePassword(values)
        }
    })

    async function UpdatePassword(values) {

        // e.preventDefault()
        let formData = {
            email: email,
            newPassword: newPassword
        };
        setIsLoading(true)
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, formData)
            if (data.statusMsg == "success") {
                setUserMessage(data.message)
                setIsLoading(false)
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message)
            setIsLoading(false)
        }
    }


    return (
        <>
            <div className="mt-5 d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="w-75 m-auto">
                        <h2 className='mb-5'>Please update your password</h2>
                        {userMessage ? <div className="alert alert-success">{userMessage}</div> : ""}
                        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ""}

                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id='email' name='email' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                            {formik.touched.email && formik.errors.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}

                            <label htmlFor="newPassword">New password:</label>
                            <input id='newPassword' name='newPassword' type="password" className='form-control mb-3' onChange={formik.handleChange} value={formik.values.newPassword} onBlur={formik.handleBlur} />
                            {formik.touched.newPassword && formik.errors.newPassword ? <div className='alert alert-danger'>{formik.errors.newPassword}</div> : ""}

                            {/* <button type='submit' className='btn btn-outline-success mt-3'>change password</button> */}
                            {isLoading ? <button type='submit' className='btn text-white my-3 bg-main'><i className='fa fa-spin fa-spinner'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn text-white my-3 bg-main'>change password</button>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
