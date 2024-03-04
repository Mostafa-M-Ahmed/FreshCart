import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [userMessage, setUserMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()


  let mySchema= Yup.object({
    name: Yup.string().min(5, "Must be at least 5 characters").max(15, 'Must be 15 characters or less').required('Name is required'),
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password not valid (Minimum eight characters, at least one letter, one number and one special character)").required('Required'),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "Password does not match").required('Required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"Phone number not valid").required('Required'),
  })


  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema:mySchema,
    onSubmit:(values)=>{
      registerForm(values)
    }
  })

  async function registerForm(values){
    setIsLoading(true)

    return axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((data)=>{

      if(data.data.message === "success"){
        setUserMessage(data.data.message)
        navigate("/login")
        setIsLoading(false)
      }
    }).catch((err)=>{
      // console.log(err);
      setErrorMessage(err.response.data.message)
      setIsLoading(false)

    })
    
  }

  return (
    <>
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="w-75  m-auto">
            <h2>Register:</h2>
            {userMessage ? <div className="alert alert-success">{userMessage}</div> : "" }
            {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : "" }


            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input type="text" id='name' name='name' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
              {formik.touched.name && formik.errors.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ""}
              
              <label htmlFor="email">Email:</label>
              <input type="email" id='email' name='email' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
              {formik.touched.email && formik.errors.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}
              
              <label htmlFor="password">Password:</label>
              <input type="password" id='password' name='password' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
              {formik.touched.password && formik.errors.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}
              
              <label htmlFor="rePassword">Retype Password:</label>
              <input type="Password" id='rePassword' name='rePassword' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur}/>
              {formik.touched.rePassword && formik.errors.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ""}
              
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id='phone' name='phone' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur}/>
              {formik.touched.phone && formik.errors.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ""}
              
              {isLoading ? <button type='submit' className='btn text-white my-3 bg-main'><i className='fa fa-spin fa-spinner'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn text-white my-3 bg-main'>Register</button>}
              
              

            </form>
          </div>
        </div>
      </div>

    </>
  )
}
