import React from 'react'
import { NavLink } from 'react-router-dom'
import error404 from '../Assets/Images/404.jpg'


export default function Notfound() {
  return (
    <>
    <div>

    {/* <img src={notfound} className='w-100' alt="" /> */}
    <div className="about min-vh-100 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className=" text-center">
            <div className="row">
              <div className="col text-center mb-5">
                <img src={error404} className='w-100' alt="" />
              </div>
                <h1>OOPS! PAGE NOT FOUND</h1>
                <p>You must be lost because this URL does not exist</p>
                <button className='btn btn-info px-4 py-3 fw-bold w-auto mx-auto'>
                <NavLink className="nav-link fw-bold rounded px-2" to="">Back to Home</NavLink>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
