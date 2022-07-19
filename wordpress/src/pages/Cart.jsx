import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);

  const decreaseQuantity = (productClicked) => {
    const index = cart.findIndex(element => element.product.id === productClicked.product.id);
    cart[index].quantity--;
    if (cart[index].quantity <= 0) {
      removeProduct(productClicked);
    }
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  const increaseQuantity = (productClicked) => {
    const index = cart.findIndex(element => element.product.id === productClicked.product.id);
    cart[index].quantity++;
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  const removeProduct = (productClicked) => {
    const index = cart.findIndex(element => element.product.id === productClicked.product.id);
    cart.splice(index,1);
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  const sendOrderToWordpress = () => {
    const lineItems = cart.map(element => {return {id: element.product.id, quantity: element.quantity}});
    // const wordpressProducts = ids.map(element => );
    console.log(lineItems);
  }

  const pay = () => {
    
  }

  return ( 
    <div>
      {cart.map(element => 
        <div>
          <div>{element.product.name}</div>
          <div>{element.product.price}</div>
          <button onClick={() => decreaseQuantity(element)}>-</button>
          <div>{element.quantity} tk</div>
          <button onClick={() => increaseQuantity(element)}>+</button>
          <div>{element.product.price * element.quantity}</div>
          <button onClick={() => removeProduct(element)}>x</button>
        </div>)}
        <button onClick={() => sendOrderToWordpress()}>Esita tellimus</button>
    </div> );
}

export default Cart;