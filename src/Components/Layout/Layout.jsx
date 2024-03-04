import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Toaster/>
    </>
  )
}
