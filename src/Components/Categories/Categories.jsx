import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Oval } from 'react-loader-spinner'

export default function Categories() {
  // loader
  const [isLoading, setIsLoading] = useState(true)
  const [allData, setAllData] = useState(null)
  const [allSubData, setAllSubData] = useState(null)
  let [catName, setCatName] = useState(null)
  const [isSelected, setIsSelected] = useState(false)

  async function getDetails() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setAllData(data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getDetails()
  }, [])


  async function getSubCat(id, name) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    setAllSubData(data.data)
    setCatName(name)

    setIsSelected(true)
  }

  return (
    <>
      {/* Category */}
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
            <div className="col-md-4">
              <a href="#subCat" onClick={() => getSubCat(el._id, el.name)} className="card">
                <div className=" card-img overflow-hidden center position-relative" style={{ height: '300px' }}>
                  <img src={el.image} className='img-fluid position-absolute start-50 translate-middle-x' alt="" />
                </div>
                <div className="card-body">
                  <p className="text-success h3 text-center">{el.name}</p>
                </div>
              </a>
            </div>
          </>)}
        </div>

        {/* subCategory */}
        {isSelected ? <>
          <div id="subCat" className="row gy-3 py-3">
            <h1 className='text-center'>{catName}'s category</h1>
            {allSubData?.map((subCat) => <>
              <div className="col-md-4">
                  <div className="card">
                    <h3 className='text-center p-3'>{subCat.name}</h3>
                </div>
              </div>
            </>)}
          </div>
        </> : ""}
      </div>
    </>
  )
}
