import React, { useContext, useState } from 'react'
import { wishlistContext } from '../../Context/WishlistContext'
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Slider from "react-slick"
import { cartContext } from '../../Context/CartContext';

export default function Wishlist() {
    const { removeItem, products } = useContext(wishlistContext)

    const [isAddingToCart, setIsAddingToCart] = useState(false)

    let { addToCart } = useContext(cartContext)

    async function addCart(id){
        setIsAddingToCart(true)
        const res = await addToCart(id)
        setIsAddingToCart(false)
        removeItem(id)
    }


    if (products == null) {
        return <>
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
        </>
    }

    if (products.length == 0) {
        return <>
            <div className='vh-100 d-flex justify-content-center align-items-center'>
                <h1>Your wishlist is empty</h1>
            </div>
        </>
    }

    
    return (
        <>
            <div className="container bg-body-tertiary p-5 my-5">
                <h2 className='fw-bold'>My Wishlist</h2>


                {products?.map((product, idx) => <div key={idx} className="row border-bottom border-1 py-3 g-3 align-items-center">
                    <div className="col-md-2">
                        <div>
                            <img className='w-100' src={product.imageCover} alt="" />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div>
                            <h4>{product.title}</h4>
                            <h6>price: {product.price} EGP</h6>
                            <button onClick={() => removeItem(product.id)} className='btn btn-danger'>Remove</button>
                        </div>
                    </div>
                    <div className="col-md-2 ">
                        <div className='d-flex justify-content-end align-items-center'>
                            <button onClick={()=>addCart(product.id)} className='btn bg-main text-white w-100'>
                                {isAddingToCart ? <i className='fa fa-spin fa-spinner'></i> : "Add to cart"}
                            </button>
                        </div>
                    </div>
                </div>)}
            </div>
        </>
    )
}