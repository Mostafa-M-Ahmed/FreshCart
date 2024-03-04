import React from 'react'

export default function About() {
  return (
    <>
      <div className="about bg-success text-white min-vh-100 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className='fw-bold'>ABOUT COMPONENT</h1>
            <div className='d-flex align-items-center gap-3'>
              <div className='solid-line'></div>
              <i className='fa-solid fa-star text-white my-3'></i>
              <div className='solid-line'></div>
            </div>
            <div className="row">
              <div className="col-lg-6 text-center">
                <p>Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p>
              </div>
              <hr className='d-lg-none' />
              <div className="col-lg-6 text-center">
                <p>Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
