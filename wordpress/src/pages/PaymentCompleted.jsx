import { useEffect, useState } from "react";

function PaymentCompleted() {
 
  const url = window.location.href;
  console.log(url);
  const order_reference = url.split("order_reference=")[1].split("&")[0];
  console.log(order_reference);
  const payment_reference = url.split("payment_reference=")[1];
  console.log(payment_reference);

  const [paymentState, setPaymentState] = useState("");

  useEffect(() => {
    fetch("https://igw-demo.every-pay.com/api/v4/payments/" + payment_reference + "?api_username=92ddcfab96e34a5f", {
      headers: {
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      // fetch Wordpressi --> muudan tellimuse staatust: Failed / Processing
    })
  }, [payment_reference]);

  // ei õnnestunud: http://localhost:3000/tellimus?order_reference=238458&payment_reference=7a81ca93109e8c340e6812ae3a43e2804f6d8699a46d9fb5ca5a27bb4f3e8929
  // õnnestus: http://localhost:3000/tellimus?order_reference=199292&payment_reference=7de074173e5e4544a9d3b26d9becc7b9039640329108644e350451b436f0f357


  return ( 
  <div>
    <div>Tellimuse nr: {order_reference}</div>
    <div>Makse: {paymentState}</div>
    { paymentState === "settled" && <div>Tellimus jõuab sinuni lähipäevil</div>}
    { paymentState === "failed" && <div>Makse ei õnnestunud</div>}
  </div> );
}

export default PaymentCompleted;