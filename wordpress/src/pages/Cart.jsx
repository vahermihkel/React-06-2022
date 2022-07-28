import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);

  const api = new WooCommerceRestApi({
    url: "http://localhost/wordpress",
    consumerKey: "ck_d6d0ac010b6c7ad2ac19d2e06c5f0cf5a14b87ba",
    consumerSecret: "cs_b508ece4284e6793c2b7803e957bc659e7226ecf",
    version: "wc/v3"
  });

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
    const lineItems = cart.map(element => {return {product_id: element.product.id, quantity: element.quantity}});
    const orderPromise = api.post("orders", {
      "line_items": lineItems
    }).then(
      res => {return res.data.id}
    )
    orderPromise.then(result => pay(result));
  }

  const calculateTotalSum = () => {
    let cartSum = 0;
    cart.forEach(element => cartSum += Number(element.product.price) * element.quantity);
    return cartSum;
  }

  const pay = (orderId) => {
    const paymentData = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": calculateTotalSum(),
      "order_reference": orderId,
      "nonce": "a9b7f7e7154a01b" + orderId + new Date(),
      "timestamp": new Date(),
      "customer_url": "https://wordpress-06.web.app/tellimus"
    }
    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
      method: "POST",
      body: JSON.stringify(paymentData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    }).then(res => res.json())
    .then(data => window.location.href = data.payment_link);
  }

  // kontroll: 
  // https://igw-demo.every-pay.com/api/v4/payments/7a81ca93109e8c340e6812ae3a43e2804f6d8699a46d9fb5ca5a27bb4f3e8929?api_username=92ddcfab96e34a5f
    // https://igw-demo.every-pay.com/api/v4/payments/7de074173e5e4544a9d3b26d9becc7b9039640329108644e350451b436f0f357?api_username=92ddcfab96e34a5f
    // 92ddcfab96e34a5f
    // 8cd19e99e9c2c208ee563abf7d0e4dad

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
        <div>{calculateTotalSum()} €</div>
        <button onClick={() => sendOrderToWordpress()}>Maksma</button>
    </div> );
}

export default Cart;

