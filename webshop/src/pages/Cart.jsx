import { useState } from "react";

function Cart() {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(sessionStorage.getItem("cart")) || []
  );

  const decreaseFromCart = (productIndex) => {
    // const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
    cartProducts[productIndex].quantity--;
    if (cartProducts[productIndex].quantity === 0) {
      removeFromCart(productIndex);
    } else {
      setCartProducts(cartProducts.slice()); 
      sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  const increaseFromCart = (productIndex) => {
    cartProducts[productIndex].quantity++;
    setCartProducts(cartProducts.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  }

  const removeFromCart = (productIndex) => {
    cartProducts.splice(productIndex, 1);
    setCartProducts(cartProducts.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  }

  return ( 
  <div>
    <button>TÜHJENDA -- KODUS</button>
    <div>OSTUKORV ON TÜHI VÕI MINGI TORE PILT</div>
    <div>TOASTIFY ASJAD</div>
    {cartProducts.map((element, index) => 
    <div>
      <img src={element.product.imgSrc} alt="" />
      <div>{element.product.name}</div>
      <div>{element.product.price}</div>
      <button onClick={() => decreaseFromCart(index)}>-</button>
      <div>{element.quantity}</div>
      <button onClick={() => increaseFromCart(index)}>+</button>
      <div>{element.product.price * element.quantity}</div>
      <button onClick={() => removeFromCart(index)}>x</button>
    </div>)}
    <button>MAKSMA -- KODUS</button>
  </div> );
}

export default Cart;