import React, { useEffect, useContext } from 'react'
import { tokenContext } from '../../Context/TokenContext'
import { useNavigate } from 'react-router-dom';

export default function App() {

  let {setToken} = useContext(tokenContext)
  let navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("userToken")){
      localStorage.removeItem("userToken")
      setToken(null)
      navigate("/login")
      document.location.reload()

    }
  }, [])

  return (
    <></>
  )
}





