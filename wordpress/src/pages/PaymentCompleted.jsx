import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from "react";

function PaymentCompleted() {
 
  const url = window.location.href;
  const order_reference = url.split("order_reference=")[1].split("&")[0];
  const payment_reference = url.split("payment_reference=")[1];

  const [paymentState, setPaymentState] = useState("");

  useEffect(() => {
    const api = new WooCommerceRestApi({
      url: "http://localhost/wordpress",
      consumerKey: "ck_d6d0ac010b6c7ad2ac19d2e06c5f0cf5a14b87ba",
      consumerSecret: "cs_b508ece4284e6793c2b7803e957bc659e7226ecf",
      version: "wc/v3"
    });
    fetch("https://igw-demo.every-pay.com/api/v4/payments/" + payment_reference + "?api_username=92ddcfab96e34a5f", {
      headers: {
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    }).then(res => res.json())
    .then(data => {
      console.log(data.payment_state);
      let status;
      if (data.payment_state === "settled") {
        status = "processing";
        setPaymentState("settled");
      } else if (data.payment_state === "failed") {
        status = "failed";
        setPaymentState("failed");
      }
      api.post("orders/" + data.order_reference, {
        "status": status
      }).then(
        res => console.log(res)
      )
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