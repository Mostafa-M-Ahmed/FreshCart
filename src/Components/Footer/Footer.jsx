import React from 'react'

export default function Footer() {
  return (
    <>
    <div className="bg-dark text-center position-relative text-white py-4">
        <div className="container ">
            <div className="row ">
                <div className="col-lg-4 my-4">
                    <h3>LOCATION</h3>
                    <p>2215 John Daniel Drive</p>
                    <p>Clark, MO 65243</p>
                </div>
                <hr className='d-lg-none' />
                <div className="col-lg-4 my-4">
                    <h3>AROUND THE WEB</h3>
                    <ul className='list-unstyled d-flex align-items-center justify-content-center gap-2'>
                        <li><i className='fa-brands fa-facebook border rounded-circle p-2'></i></li>
                        <li><i className='fa-brands fa-twitter border rounded-circle p-2'></i></li>
                        <li><i className='fa-brands fa-linkedin border rounded-circle p-2'></i></li>
                        <li><i className='fa-solid fa-globe border rounded-circle p-2'></i></li>
                    </ul>
                </div>
                <hr className='d-lg-none' />
                <div className="col-lg-4 my-4">
                    <h3>ABOUT FREELANCER</h3>
                    <p>Freelance is a free to use, licensed Bootstrap theme created by Route</p>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div className="text-center bg-black text-white py-3">
            <div className="container">
            <div className="row">
                <div className="col">
                    <p>Copyright © Your Website 2021</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}
