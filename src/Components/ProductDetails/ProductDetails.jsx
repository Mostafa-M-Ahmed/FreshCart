import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'
import Slider from "react-slick"
import { cartContext } from '../../Context/CartContext';


export default function ProductDetails() {
    const [details, setDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    let { addToCart } = useContext(cartContext)

    async function addCart(id){
        setIsAddingToCart(true)
        const res = await addToCart(id)
        setIsAddingToCart(false)
    }
    var settings = {
        dots: true,
        infinte: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
    };
    let { id } = useParams();

    
    async function getDetails(id) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/` + id)
        setDetails(data.data)
        setIsLoading(false)
    }

    useEffect(() => {
        getDetails(id)
    }, [])



    return (
        <>
            <div className="container p-5">
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
                </> : <>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <Slider {...settings}>
                                {details.images.map((el)=> <img src={el} className='w-100'/>)}
                            </Slider>
                        </div>
                        <div className="col-md-8">
                            <h3>{details.title}</h3>
                            <p className='text-secondary'>{details.description}</p>
                            <p>{details.category.name}</p>
                            <div className='d-flex justify-content-between'>
                                <p>{details.price} EGP</p>
                                <p><i className='fa fa-star rating-color'></i>{details.ratingsAverage}</p>
                            </div>
                            <button onClick={()=>addCart(details.id)} className='btn bg-main text-white w-100'>
                                {isAddingToCart ? <i className='fa fa-spin fa-spinner'></i> : "Add to cart"}
                            </button>
                        </div>
                    </div>
                </>}

            </div>
        </>
    )
}
