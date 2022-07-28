import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from 'react';


function HomePage() {
    // HILJEM - fetch kaudu kõik tooted
  // const products = ProductsFromWordpress;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const api = new WooCommerceRestApi({
      url: "http://localhost/wordpress",
      consumerKey: "ck_d6d0ac010b6c7ad2ac19d2e06c5f0cf5a14b87ba",
      consumerSecret: "cs_b508ece4284e6793c2b7803e957bc659e7226ecf",
      version: "wc/v3",
      axiosConfig: {
        headers: {}
      }
    });
    api.get("products",{
      per_page: 2,
      page: 2
    }).then(
      res => setProducts(res.data)
    )
  }, []); 

  // COPY-PASTE OSTUKORVI LISAMINE
  // sessionStorage.    "cart"
  const addToCart = (productClicked) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const index = cart.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cart[index].quantity++;
    } else {
      const newProduct = {product: productClicked, quantity: 1};
      cart.push(newProduct);
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  return ( 
    <div>
      {products.map(element => 
      <div key={element.id}>
        <div>{element.id}</div>
        <div>{element.name}</div>
        <div>{element.price} €</div>
        <button onClick={() => addToCart(element)}>Lisa ostukorvi</button>
      </div>)}
    </div> );
}

export default HomePage;

// 70 / 4 = 17.5
// 16
// 21.juuli 2ak/h ---> makse --- 14.30
// 26.juuli 3ak/h ---> 13.00-15.15 Wordpressi API päringud (toodete võtmine, tellimuste lisamine, tellimuste muutmine)
// 28.juuli 3ak/h ---> 13.00-15.15 proovitöö lõpuni tegemisega,  React-Query, TypeScript
//allkirjaleht: 4.august 2ak/h ---> iseseisva projekti analüüs 

// tegelikult: 19.august 2ak/h R 13.00-14.30