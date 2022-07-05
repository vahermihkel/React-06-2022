import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SortButtons from "../components/SortButtons";

// ffc    https://react-query.tanstack.com/overview
// toast erinevate lehtede erinev disain
function Home() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const productDb = "https://react-06-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  // uef
  useEffect(()=>{
    fetch(productDb)
      .then(res => res.json())
      .then(data => {
        // {-N54pl: {1}, -321a: {2}} ---> [{1},{2}]
        const productArray = [];
        let categoryArray = [];
        for (const key in data) {
          productArray.push(data[key]);
          categoryArray.push(data[key].category);
        }
        categoryArray = [...new Set(categoryArray)];
        setCategories(categoryArray);
        // const product = {id: 2, name: "da", category: "a", isActive: true}
        // const productArray = [];
        // for (const key in product) {
        //   // 1. key: id
        //   productArray.push(product[key]);   // product.id
        //   // 2. key: name --> product.name
        //   // 3. key: category --> product.category
        // }
        // productArray = [2, "da", "a", true];
        setProducts(productArray);
        setOriginalProducts(productArray);
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
      const index = cartProducts.findIndex(element => element.product.id === 11122333)
      if (index >= 0) {
        cartProducts.splice(cartProducts.length-1, 0, {product: productClicked, quantity: 1});
      } else {
        cartProducts.push({product: productClicked, quantity: 1});
      }
    }
          // "[{product: {id: 312, name: "dasd"}, quantity: 1}]"
          //[{product: {id: 312, name: "dasd"}, quantity: 2}]
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    toast.success(t("home.cart-added"),{
      position: "bottom-right",
      theme: "dark"
    });
  }

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filterProducts = (categoryClicked) => {
    if (categoryClicked === 'all') {
      setProducts(originalProducts);
      setSelectedCategory('all');
    } else {
      const newProducts = originalProducts.filter(element => element.category === categoryClicked);
      setProducts(newProducts);
      setSelectedCategory(categoryClicked);
    }
  }

  // props.
  //<ChildClass VÕTI={MUUTUJA} VÕTI2={FUNKTSIOON} />
  return (
  <div>
    <div className={selectedCategory === 'all' ? 'active-category' : undefined } 
          onClick={() => filterProducts('all')}>Kõik kategooriad</div>
    {categories.map(element => 
      <div className={selectedCategory === element ? 'active-category' : undefined } 
        key={element} onClick={() => filterProducts(element)}>
        {element}
      </div>)}
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