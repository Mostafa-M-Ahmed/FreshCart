import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';


export default function Products() {
  const [isAdding, setIsAdding] = useState(false)
  const [isAddingWishlist, setIsAddingWishlist] = useState(false)
  const [searchArr, setSearchArr] = useState([])

  // posting products
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  let { data, isLoading, isFetching } = useQuery("FeatureProducts", getProducts, {
    // cacheTime: 5000
  })


  function search(term) {
    const x = data?.data?.data
    const searchedArr = [];
    for (let i = 0; i < x.length; i++) {
      if (x[i].title.toLowerCase().includes(term.toLowerCase()) == true) {
        searchedArr.push(x[i])
      }
    }
    setSearchArr(searchedArr)
    console.log("searched arr = ", searchArr);
  }


  // cart
  let { addToCart } = useContext(cartContext)
  async function addCart(id) {
    setIsAdding(true)
    const res = await addToCart(id)
    setIsAdding(false)
  }


  // wishlist
  let { addToWishlist, products, removeItem } = useContext(wishlistContext)
  async function addWishlist(id) {
    setIsAddingWishlist(true)
    const res = await addToWishlist(id)
    setIsAddingWishlist(false)
  }



  return (
    <>
      {/* loader */}
      <div className="container-fluid min-vh-100 pt-5 px-5 ">
        <div className="row">
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

          {/* search bar */}
          {isLoading ? "" : <input type="text" placeholder="search" id="searchBar" class="w-100 form-control mb-4 mx-auto bg-secondary-subtle" onInput={(e) => search(e.target.value)} />}


          {/* products */}
          {/*       onClick={() => products.find((product) => product.id === el.id) ? removeItem(el.id) : addWishlist(el.id)}     */}
          {(searchArr.length == 0 ? data?.data?.data : searchArr)?.map((el) =>
            <div key={el.id} className="col-md-6 col-lg-4 col-xl-3 col-xxl-2">
              <div className="product rounded py-1 px-3">

                <Link to={`details/` + el.id}> <img src={el.imageCover} className='w-100' alt="" />
                  <p className='text-main'>{el.subcategory[0].name}</p>
                  <h5>{el.title.split(" ").slice(0, 3).join(" ")}</h5>
                  <div className='d-flex justify-content-between'>
                    <p>{el.price} EGP</p>
                    <div>
                      <i className='fa fa-star rating-color me-1'></i>{el.ratingsAverage}
                    </div>
                  </div>
                </Link>

                <div className='d-flex justify-content-between'>
                  <button onClick={() => addCart(el.id)} className='btn bg-main w-100 text-white'>{isAdding ? <i className='fa fa-spin fa-spinner'></i> : "Add to cart"}</button>
                  <button onClick={() => products.find((product) => product.id === el.id) ? removeItem(el.id) : addWishlist(el.id)} className=' btn ms-auto' >
                    {products.find((product) => product.id === el.id) ? <i class="fa-solid fa-heart fa-2x" style={{ color: "red" }}></i> : <i className='favi fa fa-heart fa-2x '></i>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
