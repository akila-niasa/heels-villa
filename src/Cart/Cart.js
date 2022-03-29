import React, { useEffect, useState } from "react";
import "./Cart.css";
import { IoTrashBin } from "react-icons/io5";

const Cart = ({ cart, products, handleClearCart }) => {
  const[choose,setChoose]=useState(false)
  const[freeProduct,setFreeProduct]=useState({})
  useEffect(()=>{
    if(cart.length>0){
      setChoose(true)
    }
    else{
      setChoose(false)
    }
  },[cart])
  const randomChoose=()=>{
    const random=products[Math.floor(Math.random()*products.length)]
    setFreeProduct(random);
  }
 
  return (
    <div className='cart'>
      <div className='cart-header'>
        <h1>Order Summery</h1>
        <button
          onClick={handleClearCart}
          className='remove-button'
          title='Clear Cart'
        >
          <IoTrashBin color='white' size={20} />
        </button>
      </div>
      {cart.map((product, index) => (
        <div key={index} className='cart-item'>
          <img src={product.pairImage} alt='' />
          <div>
            <p>
              {product.name} {product.color}
            </p>
            <p>$ {product.price}</p>
            <p>quantity: {product.quantity}</p>
          </div>
        </div>
      ))}
      <button className={choose ? "offer-button" : "offer-button-disabled"} onClick={randomChoose} disabled={!choose}>choose one for me</button>
     
        {Object.keys(freeProduct).length>0 &&(
            <div className='cart-item'>
        <img src={freeProduct.pairImage} alt='' />
        <div>
          <p>
            {freeProduct.name} {freeProduct.color}
          </p>
          <p>$ {freeProduct.price}</p>
        </div>
     
    </div>
          )}
    
    </div>
  );
};

export default Cart;
