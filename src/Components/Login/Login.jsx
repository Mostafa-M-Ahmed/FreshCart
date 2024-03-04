import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Context/TokenContext';
import { Link, NavLink } from 'react-router-dom'

export default function Login() {
  let { token, setToken } = useContext(tokenContext)
  const [userMessage, setUserMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()


  let mySchema = Yup.object({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password not valid (Minimum eight characters, at least one letter, one number and one special character)").required('Required'),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      loginForm(values)
    }
  })


  async function loginForm(values) {
    setIsLoading(true)
    return axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((data) => {
      if (data.data.message === "success") {
        setUserMessage(data.data.message)
        // set token in local storage
        localStorage.setItem("userToken", data.data.token)
        // set token in context
        setToken(data.data.token)
        setIsLoading(false)
        navigate("/")
      }
    }).catch((err) => {
      setErrorMessage(err.response.data.message)
      setIsLoading(false)

    })

  }


  return (
    <>
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="w-75 m-auto">
            <h2>Login:</h2>
            {userMessage ? <div className="alert alert-success">{userMessage}</div> : ""}
            {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ""}


            <form className='py-2' onSubmit={formik.handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input type="email" id='email' name='email' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
              {formik.touched.email && formik.errors.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}

              <label htmlFor="password">Password:</label>
              <input type="password" id='password' name='password' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
              {formik.touched.password && formik.errors.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}

              <div className='d-flex align-items-center justify-content-between'>
                {isLoading ? <button type='submit' className='btn text-white my-3 bg-main'><i className='fa fa-spin fa-spinner'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn text-white my-3 bg-main'>Login</button>}
                <Link className='fw-bold' to="/forgot-password">forget your password ?</Link>
              </div>




            </form>
          </div>
        </div>
      </div>

    </>
  )
}
