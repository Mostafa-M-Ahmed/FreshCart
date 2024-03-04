import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Oval } from 'react-loader-spinner'

export default function Brands() {
  // loader
  const [isLoading, setIsLoading] = useState(true)
  const [allData, setAllData] = useState(null)


  async function getDetails() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setAllData(data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getDetails()
  }, [])

  



  return (
    <>
      {/* brands */}
      <div className="container py-5">
        <div className="row g-4 pb-5 mb-5">
          {isLoading ? <>
            <div className='min-vh-100 d-flex justify-content-center align-items-center'>
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          </> : ""}
          {allData?.map((el) => <>
            <div className="col-md-3">
                <div className="card">
                  <div className=" card-img">
                    <img src={el.image} className='img-fluid ' alt="" />
                  </div>
                  <div className="card-body">
                    <p className="text-center">{el.name}</p>
                  </div>
              </div>
            </div>
          </>)}
        </div>
      </div>
    </>
  )
}
