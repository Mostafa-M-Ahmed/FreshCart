import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Payment() {
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [details, setDetails] = useState("")
    const { cartId, setNumOfItem, setProducts, setTotalPrice } = useContext(cartContext)
    const nav = useNavigate()

    async function cashPayment(e) {
        e.preventDefault()
        let formData = {
            shippingAddress: {
                details: details,
                phone: phone,
                city: city
            },
        };

        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, formData, {
                headers: {
                    token: localStorage.getItem("userToken")
                },
                params: {
                    url: "http://localhost:3000"
                }
            })
            if (data.status == "success") {
                setNumOfItem(0);
                setProducts([]);
                setTotalPrice(0);
                window.open(data.session.url)
            }

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className="m-5">
                <div className="w-50 m-auto">
                    <form onSubmit={cashPayment}>
                        <label htmlFor="city">City:</label>
                        <input onChange={(e) => setCity(e.target.value)} type="text" id='city' required className='form-control mb-4' />

                        <label htmlFor="phone">Phone:</label>
                        <input onChange={(e) => setPhone(e.target.value)} type="tel" id='phone' required className='form-control mb-4' />

                        <label htmlFor="details">Details:</label>
                        <textarea onChange={(e) => setDetails(e.target.value)} type="text" id='details' className='form-control mb-4' cols="30" rows="5"></textarea>

                        <button className='btn btn-info'>Pay Now</button>
                    </form>
                </div>
            </div>
        </>
    )
}
