import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";


let headers = {
    token: localStorage.getItem("userToken")
}
export let wishlistContext = createContext();


export default function WishlistContextProvider(props) {
    const [products, setProducts] = useState(null);
    const [wishlistId, setWishlistId] = useState("")


    useEffect(() => {
      getUserWishlist()
    }, [])

    async function addToWishlist(id) {
        
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId: id
        }, {
            headers
        }).then((data) => {
            toast.success('Product added to wishlist !', {
                duration: 1500
            })
            getUserWishlist()
        }).catch((err) => {
            console.log(err);
            toast.error("This didn't Worked.", {
                duration: 1500
            })

        })
    }
    async function getUserWishlist(){
        try {
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers
            })
            if(data.status == "success") {
                setProducts(data.data);
                setWishlistId(data.data._id)
            }
            return data
        } catch (err) {
            setProducts([])
            
        }
    }

    async function removeItem(id){
        try {
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers
            })
            if(data.status == "success"){
                setProducts((prevState) => prevState.filter((el) => el.id !== id))
                toast.success('Product removed from wishlist !', {
                    duration: 1500
                })
            }

        } catch (error) {
            console.log(error);
        }
    }


    return <wishlistContext.Provider value={{setProducts, wishlistId,  removeItem, addToWishlist, products}}>
        {props.children}
    </wishlistContext.Provider>
}