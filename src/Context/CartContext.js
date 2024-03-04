import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";


let headers = {
    token: localStorage.getItem("userToken")
}
export let cartContext = createContext();


export default function CartContextProvider(props) {
    const [numOfItem, setNumOfItem] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState(null);
    const [cartId, setCartId] = useState("")
    const [first, setfirst] = useState(0)


    useEffect(() => {
      getUserCart()
    }, [])
let x = 0
    async function addToCart(id) {
        
        // let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: id
        }, {
            headers
        }).then((data) => {

            toast.success('Product added to cart !', {
                duration: 1500
            })
            getUserCart()
        }).catch((err) => {
            console.log(err);
            toast.error("This didn't Worked.", {
                duration: 1500
            })

        })
    }
    async function getUserCart(){
        try {
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers
            })
            if(data.status == "success") {
                setNumOfItem(data.numOfCartItems);
                setProducts(data.data.products);
                setTotalPrice(data.data.totalCartPrice);
                setCartId(data.data._id)
            }
            // console.log(data, "cartUser");
            return data
        } catch (err) {
            setProducts([])
            
        }
    }

    async function removeItem(id){
        try {
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers
            })
            if(data.status == "success"){
                setNumOfItem(data.numOfCartItems);
                setProducts(data.data.products);
                setTotalPrice(data.data.totalCartPrice);
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function updateCountProduct(id, count){
        try {
            const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count: count}, {
                headers
            })
            if(data.status == "success"){

                setNumOfItem(data.numOfCartItems);
                setProducts(data.data.products);
                setTotalPrice(data.data.totalCartPrice);
            }
        return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function clearCart(){
        try {
          const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
            headers
          })

          if(data.message == "success"){
            setNumOfItem(0);
            setProducts([]);
            setTotalPrice(0);
        }
          return data;
        } catch (error) {
          console(error)
        }
      }
    return <cartContext.Provider value={{ setNumOfItem, setProducts, setTotalPrice, cartId, clearCart, updateCountProduct, removeItem, addToCart, numOfItem, totalPrice, products}}>
        {props.children}
    </cartContext.Provider>
}