import React from 'react'

export default function Contact() {
  return (
    <>
    <div className='contact bg-body-tertiary min-vh-100 text-center d-flex justify-content-center align-items-center'>
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className='fw-bold'>CONTACT SECTION</h1>
            <div className='d-flex align-items-center gap-3'>
              <div className='solid-line-black'></div>
              <i className='fa-solid fa-star my-3'></i>
              <div className='solid-line-black'></div>
            </div>
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <form action="" className='w-75 text-start'>
            <input className='bg-body-tertiary py-2 my-3 form-control border border-top-0 border-start-0 border-end-0 rounded-4' required placeholder='Name' type="text" />
            <input className='bg-body-tertiary py-2 my-3 form-control border border-top-0 border-start-0 border-end-0 rounded-4' required placeholder='Age' type="text" />
            <input className='bg-body-tertiary py-2 my-3 form-control border border-top-0 border-start-0 border-end-0 rounded-4' required placeholder='Email' type="email" />
            <input className='bg-body-tertiary py-2 my-3 form-control border border-top-0 border-start-0 border-end-0 rounded-4' required placeholder='Password' type="password" />
            <button className='btn btn-success w'>Send Message</button>
          </form>
          </div>
          
        </div>
      </div>
    </>
  )
}
