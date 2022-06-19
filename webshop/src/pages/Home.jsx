import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

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
      .then(data => setProducts(data))
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

  const sortAZ = () => { // .name
    products.sort((a,b)=> a.name.localeCompare(b.name));
    setProducts(products.slice());
  }

  const sortZA = () => {
    // "ipad" - "samsung" = ????
    products.sort((a,b)=> b.name.localeCompare(a.name));
    setProducts(products.slice());
  }

  const sortPriceAsc = () => {
    products.sort((a,b)=> a.price-b.price);
    setProducts(products.slice());
  } // .price

  // 312 - 12 = pos/neg
  const sortPriceDesc = () => {
    products.sort((a,b)=> b.price-a.price);
    setProducts(products.slice());
  }

  return (
  <div>
    <button onClick={sortAZ}>{t('home.sortaz')}</button>
    <button onClick={sortZA}>{t('home.sortza')}</button>
    <button onClick={sortPriceAsc}>{t('home.sort-price-asc')}</button>
    <button onClick={sortPriceDesc}>{t('home.sort-price-desc')}</button>
    {products.map(element => 
    <div>
      <img src={element.imgSrc} alt="" />
      <div>{element.name}</div>
      <div>{element.price}</div>
      <button onClick={() => addToCart(element)}>{t("home.add-cart-button")}</button>
    </div>)}
  <ToastContainer />
  </div>)
}

export default Home;