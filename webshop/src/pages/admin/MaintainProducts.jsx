import { useRef } from "react";
import { useEffect, useState } from "react";
// import { useTranslation } from 'react-i18next';

function MaintainProducts() {
  const [products, setProducts] = useState([]);
  const productDb = "https://react-06-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  // const { t } = useTranslation();
  const searchedProductRef = useRef();
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(()=>{
    fetch(productDb)
      .then(res => res.json())
      .then(data => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setProducts(newArray);
        setOriginalProducts(newArray);
      })
  },[]);

  const deleteProduct = (index) => {
    // splice - [] kustutamiseks/lisamiseks    [].splice(3,0,{})
    // slice - []   koopia tegemiseks    [{}].slice(0,10)  -> [{}]
    // split - ""   stringist array     "Elas metsas mutionu,".split(" ")  -> ["Elas", "metsas", "mutionu,"]
    products.splice(index,1);      
    setProducts(products.slice());
    fetch(productDb, {
      method: "PUT",
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "application/json"
      }
    });
    // toast.success(`Edukalt toode kustutatud`);
  }

  // otsi() {
  //    otsimiseRef.current.value
  //   element.name.indexOf(otsimiseRef.current.value)  --> 200
  //   .filter(element => element.name.indexOf(otsimiseRef.current.value) >= 0)
  //}

  const searchProducts = () => {
    // console.log(searchedProductRef.current.value);
    const searchedInput = searchedProductRef.current.value.toLowerCase();

    const newProducts = originalProducts.filter(element => 
      element.name.toLowerCase().indexOf(searchedInput) >= 0 ||
      element.id.toString().indexOf(searchedInput) >= 0 ||
      element.description.toLowerCase().indexOf(searchedInput) >= 0
      );
    setProducts(newProducts);
    console.log(newProducts);
  }

  return ( <div>
    {/* input ref=otsimiseRef onChange={otsi} [  samsung  ] */}
    <input type="text" ref={searchedProductRef} onChange={searchProducts} />
     {products.map((element, index) => 
      <div key={element.id + index}>
        <img className="product-image" src={element.imgSrc} alt="" />
        <div>{element.name}</div>
        <div>{element.price}</div>
        <div>{element.description}</div>
        <div>{element.id}</div>
        <button>MUUDA - KOJU</button>
        <button onClick={() => deleteProduct(index)}>Kustuta toode</button>
        {/* <button onClick={() => addToCart(element)}>{t("home.add-cart-button")}</button> */}
      </div>)}
  </div> );
}

export default MaintainProducts;