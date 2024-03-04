import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner';

const AllOrders = () => {
  const userId = jwtDecode(localStorage.getItem("userToken")).id;
  const [allData, setAllData] = useState(null)
  async function getAllOrders(){
    
    try {
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      setAllData(data)
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getAllOrders()
  
  }, [])
  

  return (
    <>
      <div className="container py-5">
        <div className="row g-3">
          {allData ? allData.map((order,idx) => <div key={idx} className="col-md-6">
            <div className="inner p-3 bg-info rounded-2">
              <p>Phone: {order.shippingAddress?.phone}</p>
              <p>City: {order.shippingAddress?.city}</p>
              <p>Details: {order.shippingAddress?.details}</p>
              <p>payment Method: {order.paymentMethodType}</p>

              <div className="row">
              {order.cartItems.map(item => <div className="col-md-4">
                <div>
                  <img src={item.product.imageCover} className='w-100' alt="" />
                  <h6>{item.product.title.split(" ").slice(0,2).join(" ")}</h6>
                </div>
              </div>)
              }
            </div>
            </div>
          </div>)  : (<div className='min-vh-100 d-flex justify-content-center align-items-center'>
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>) }
          
        </div>
      </div>
    </>
  )
}

export default AllOrders