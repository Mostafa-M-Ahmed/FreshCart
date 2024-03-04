import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { clearCart, updateCountProduct, removeItem, numOfItem, totalPrice, products } = useContext(cartContext)


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
        <h1>Your cart is empty</h1>
      </div>
    </>
  }

  async function remove(id) {
    const res = await removeItem(id)
      .then((data) => {
        toast.success("Item removed successfully", {
          duration: 1500
        });
      }).catch((err) => {
        console.log(err);
        toast.error("This didn't Worked.", {
          duration: 1500
        })
      })
  }

  async function update(id, count) {
    const res = await updateCountProduct(id, count).then((data) => {
      toast.success("Item updated successfully", {
        duration: 1500
      });
    }).catch((err) => {
      console.log(err);
      toast.error("This didn't Worked.", {
        duration: 1500
      })
    })
  }

  async function clearCartUser() {
    await clearCart()
  }

  return (
    <>
      <div className="container bg-body-tertiary p-5 my-5">
        <div className="row d-flex align-content-center justify-content-between">
          <div className="col-md-6">
            <h2>Shop Cart</h2>
            <h5>Total Price: <span className='fw-bold ms-1 text-main'>{totalPrice} EGP</span></h5>

          </div>
          <div className="col-md-6 text-end">
            <Link to="/payment" className='btn btn-primary ms-auto'>Check out</Link>
            <h5 className='mt-1'>Total number of items: <span className='fw-bold ms-1 text-main'>{numOfItem}</span></h5>
          </div>
        </div>


        {products?.map((product, idx) => <div key={idx} className="row border-bottom border-1 py-3 g-3 align-items-center">
          <div className="col-md-2">
            <div>
              <img className='w-100' src={product.product.imageCover} alt="" />
            </div>
          </div>
          <div className="col-md-7">
            <div>
              <h4>{product.product.title}</h4>
              <h6>price: {product.price} EGP</h6>
              <button onClick={() => remove(product.product.id)} className='btn btn-danger'>Remove</button>
            </div>
          </div>
          <div className="col-md-3 ">
            <div className='d-flex justify-content-end align-items-center'>
              
              {product.count <= 1 ? (<button onClick={() => remove(product.product.id)} className='btn btn-outline-success'><i className='fa fa-minus'></i></button>) : (<button onClick={() => update(product.product.id, product.count - 1)} className='btn btn-outline-success'><i className='fa fa-minus'></i></button>)}
              <span className='mx-3 fw-bold'>{product.count}</span>
              <button onClick={() => update(product.product.id, product.count + 1)} className='btn btn-outline-success'>
                <i className='fa fa-plus'></i>
              </button>
            </div>
          </div>
        </div>)}
        <button onClick={clearCartUser} className='btn btn-outline-warning d-flex mt-4 mx-auto text-black fw-bold fs-5'>Clear your Cart</button>
      </div>
    </>
  )
}