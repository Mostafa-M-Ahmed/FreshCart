import React, { useEffect, useContext } from 'react'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Brands from './Components/Brands/Brands'
import Products from './Components/Products/Products'
import Wishlist from './Components/Wishlist/Wishlist'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import AllOrders from './Components/AllOrders/AllOrders'
import Contact from './Components/Contact/Contact'
import Payment from './Components/Payment/Payment'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Notfound from './Components/Notfound/Notfound'
import Login from './Components/Login/Login'
import Logout from './Components/Logout/Logout'
import Register from './Components/Register/Register'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import UpdatePassword from './Components/UpdatePassword/UpdatePassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import { tokenContext } from './Context/TokenContext'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth'


export default function App() {

  let {setToken} = useContext(tokenContext)

  useEffect(() => {
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"))
    }
  }, [])
  
  
  let routes = createHashRouter([{
    path:"", element:<Layout/>, children:[
      {index: true, element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:"", element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:"cart", element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:"contact", element:<ProtectedRoutes><Contact/></ProtectedRoutes>},
      {path:"payment", element:<ProtectedRoutes><Payment/></ProtectedRoutes>},
      {path:"wishlist", element:<ProtectedRoutes><Wishlist/></ProtectedRoutes>},
      {path:"products", element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:"categories", element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path:"brands", element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
      {path:"allorders", element:<ProtectedRoutes><AllOrders/></ProtectedRoutes>},
      {path:"details/:id", element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},

      {path:"login", element:<ProtectedAuth><Login/></ProtectedAuth>},
      {path:"forgot-password", element:<ProtectedAuth><ForgotPassword/></ProtectedAuth>},
      {path:"update-password", element:<ProtectedAuth><UpdatePassword/></ProtectedAuth>},
      {path:"verify-code", element:<ProtectedAuth><VerifyCode/></ProtectedAuth>},
      {path:"register", element:<ProtectedAuth><Register/></ProtectedAuth>},
      {path:"logout", element:<Logout/>},
      {path:"*", element:<Notfound/>}
    ]
  }])
  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}
