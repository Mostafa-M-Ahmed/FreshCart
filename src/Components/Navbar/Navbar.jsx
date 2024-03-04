import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from "../Assets/Images/freshcart-logo.svg"
import { tokenContext } from '../../Context/TokenContext'
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';

const links = [
  {
    link: "",
    text: "Home",
    id: "1"
  },
  {
    link: "cart",
    text: "Cart",
    id: "2"
  },
  {
    link: "wishlist",
    text: "Wishlist",
    id: "3"
  },
  {
    link: "products",
    text: "Products",
    id: "4"
  },
  {
    link: "categories",
    text: "Categories",
    id: "5"
  },
  {
    link: "brands",
    text: "Brands",
    id: "6"
  },
  // {
  //   link: "contact",
  //   text: "Contact us",
  //   id: "7"
  // }
]


export default function Navbar() {
  const [isvalid, setIsvalid] = useState(true)
  let { token, setToken } = useContext(tokenContext)
  const { numOfItem } = useContext(cartContext)
  let navigate = useNavigate()

  function logout() {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/login")
  }

  return (
    <>
      <nav className="navbar py-1 sticky-top navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand h1 fw-bold fs-2" to="">
            <img src={logo} alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 gap-2 mb-lg-0 font-sm ">
              {token ? <>
                {links.map(link => <li key={link.id} className="nav-item rounded">
                  <NavLink className="nav-link fw-bold rounded px-2 main-links" to={link.link}>{link.text}</NavLink>
                </li>)}

              </> : ""}

            </ul>

            {/* register, login, logout */}
            <ul className="navbar-nav ms-auto mb-2 gap-2 mb-lg-0 font-sm align-items-center">
              {token ? <>
                <li className='nav-item d-flex align-items-center me-4 position-relative pt-2'>
                  <i class=" fa-2x fa-solid fa-cart-shopping"></i>
                  {isvalid ? <span className="position-absolute mt-1 top-0 start-100 translate-middle badge rounded bg-main">
                    {numOfItem}
                    <span className="visually-hidden">unread messages</span>
                  </span> : ""}
                </li>
                <li className='nav-item'>
                  <button onClick={logout} className='btn btn-outline-danger border border-0 border-danger nav-link'>Logout</button>
                </li>
              </> : <>
                <li className='nav-item'><Link className='nav-link' to="register">Register</Link></li>
                <li className='nav-item'><Link className='nav-link' to="login">Login</Link></li>
              </>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
