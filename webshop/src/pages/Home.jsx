import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SortButtons from "../components/SortButtons";

// ffc    https://react-query.tanstack.com/overview
// toast erinevate lehtede erinev disain
function Home() {
  const [products, setProducts] = useState([]);
  const productDb = "https://react-06-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const { t } = useTranslation();

  // uef
  useEffect(()=>{
    fetch(productDb)
      .then(res => res.json())
      .then(data => {
        // {-N54pl: {1}, -321a: {2}} ---> [{1},{2}]
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        // const product = {id: 2, name: "da", category: "a", isActive: true}
        // const newArray = [];
        // for (const key in product) {
        //   // 1. key: id
        //   newArray.push(product[key]);   // product.id
        //   // 2. key: name --> product.name
        //   // 3. key: category --> product.category
        // }
        // newArray = [2, "da", "a", true];
        setProducts(newArray);
      })
  },[]);

  // [{id: 1},{id: 1},{id: 1},{id: 2},{id: 1}] <-- vana viis
  // [{toode:{id: 1},kogus:4}, {toode: {id: 2},kogus:1}] <- objekt objektis

                // {id: 312, name: "dasd"}
  const addToCart = (productClicked) => {
    // let cartProducts = sessionStorage.getItem("cart"); 1. võta SS-st
    // cartProducts = JSON.parse(cartProducts) || []; 2. võta jutumärgid maha
    // cartProducts = []
    // cartProducts = [{product: {id: 312, name: "dasd"}, quantity: 1}]
    const cartProducts = JSON.parse(sessionStorage.getItem("cart")) || [];
    // -1
    // 0
    const index = cartProducts.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      // KUI JUBA ON OSTUKORVIS
      //[{product: {id: 312, name: "dasd"}, quantity: 2}]
      cartProducts[index].quantity++;
      // cartProducts[index].quantity += 1;
      // cartProducts[index].quantity = cartProducts[index].quantity + 1;
    } else {
      // KUI ESIMEST KORDA + VAJUTATAKSE
      // [].push({product: {id: 312, name: "dasd"}, quantity: 1})
      cartProducts.push({product: productClicked, quantity: 1});
    }
          // "[{product: {id: 312, name: "dasd"}, quantity: 1}]"
          //[{product: {id: 312, name: "dasd"}, quantity: 2}]
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    toast.success(t("home.cart-added"),{
      theme: "dark"
    });
  }

  // props.
  //<ChildClass VÕTI={MUUTUJA} VÕTI2={FUNKTSIOON} />
  return (
  <div>
    <SortButtons
      products={products}
      updateProducts={setProducts} />
    {products.map((element, index) => 
    <div key={element.id + index}>
      <img src={element.imgSrc} alt="" />
      <div>{element.name}</div>
      <div>{element.price}</div>
      <div>{element.id}</div>
      <button onClick={() => addToCart(element)}>{t("home.add-cart-button")}</button>
    </div>)}
  <ToastContainer />
  </div>)
}

export default Home;