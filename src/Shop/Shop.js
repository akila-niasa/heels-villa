import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import{getItemCard,setItemCard,clearLocalStorage}from "../Utilities/utilities"
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  console.log(products);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  useEffect(()=>{
    if(products.length){
      const storedCard=getItemCard()
      let previousCard=[]
      for(const id in storedCard){
        const foundProduct=products.find(product=>product.id==id)
        if(foundProduct){
          const quantity = storedCard[id];
          foundProduct.quantity = quantity;
          previousCard.push(foundProduct);
        }
      }
      setCart(previousCard)
    }
  },[products])
  const handleAddToCart = (selectedProduct) => {
    let newCart=[]
    // newProduct=[...cart,selectedProduct]
    const exist = cart.find((product) => product.id === selectedProduct.id);

    if (!exist) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id != selectedProduct.id);

      selectedProduct.quantity = selectedProduct.quantity + 1;
      newCart = [...rest, selectedProduct];
    }
   setCart(newCart)
   setItemCard(selectedProduct.id)
  };

  const handleClearCart = () => {
    setCart([])
    clearLocalStorage()

  };

  return (
    <>
      <div className='shop'>
        <div className='products-container'>
          {products.map((product, index) => {
            return (
              <Product
                key={index}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
        <div className='cart-container'>
          <Cart
            cart={cart}
            products={products}
            handleClearCart={handleClearCart}
          />
        </div>
      </div>
    </>
  );
};

export default Shop;
