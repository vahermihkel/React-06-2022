import { useEffect, useRef, useState } from "react";

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imgSrcRef = useRef();
  const isActiveRef = useRef();
  
  const [message, setMessage] = useState("");
  const productDbUrl = "https://react-06-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [categories, setCategories] = useState([]);
  const categoryDbUrl = "https://react-06-webshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const [products, setProducts] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    fetch(categoryDbUrl).then(res => res.json())
      .then(data => {
        const newArray = [];
        for (const key in data) {
         newArray.push(data[key]);
        }
        setCategories(newArray);
      })
    fetch(productDbUrl).then(res => res.json())
    .then(data => {
      const newArray = [];
      for (const key in data) {
        newArray.push(data[key]);
      }
      setProducts(newArray);
    })
    // const categoriesFromDb = fetchFromDb(categoryDbUrl);
    // setCategories(categoriesFromDb);
    // const productsFromDb = fetchFromDb(productDbUrl);
    // setProducts(productsFromDb);
  },[]);

  // const fetchFromDb = (url) => {
  //   let itemsFromDb = []
  //   fetch(url).then(res => res.json())
  //   .then(data => {
  //     const newArray = [];
  //     for (const key in data) {
  //       newArray.push(data[key]);
  //     }
  //     itemsFromDb = newArray;
  //   })
  //   return itemsFromDb;
  // } 

  const addNewProduct = () => {
    if (nameRef.current.value === "") {
      setMessage("Ei saa ilma nimeta toodet lisada!");
    } else {
      setMessage("Lisatud edukalt toode " + nameRef.current.value);
      const newProduct = {
        id: Number(idRef.current.value), 
        name: nameRef.current.value, 
        price: Number(priceRef.current.value), 
        category: categoryRef.current.value,
        imgSrc: imgSrcRef.current.value, 
        description: descriptionRef.current.value, 
        isActive: isActiveRef.current.checked
      };
      fetch(productDbUrl, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  }

  const checkIdUniqueness = () => {
    if (idRef.current.value.length === 8) {
      // const index = products.findIndex(element => {
      //   return Number(element.id) === Number(idRef.current.value)
      // });
      const index = products.findIndex(element => 
          Number(element.id) === Number(idRef.current.value)
        );
      if (index >= 0) {
        setMessage("ID on mitteunikaalne!");
        setButtonDisabled(true);
      } else {
        setMessage("");
        setButtonDisabled(false);
      }
    }
  }

  return (
  <div>
    <label>Toote id</label> <br />
    <input ref={idRef} onChange={() => checkIdUniqueness()} type="number" /> <br />
    <label>Toote nimi</label> <br />
    <input ref={nameRef} type="text" /> <br />
    <label>Toote hind</label> <br />
    <input ref={priceRef} type="number" /> <br />
    <label>Toote kirjeldus</label> <br />
    <input ref={descriptionRef} type="text" /> <br />
    <label>Toote kategooria</label> <br />
    {/* <input ref={categoryRef} type="text" /> <br /> */}
    <select ref={categoryRef}>
      <option selected disabled>Vali kategooria</option>
      {categories.map(element => <option>{element.name}</option>)}
    </select> <br />
    <label>Toote pilt</label> <br />
    <input ref={imgSrcRef} type="text" /> <br />
    <label>Toode aktiivne</label> <br />
    <input ref={isActiveRef} type="checkbox" /> <br />
    <button disabled={buttonDisabled} onClick={addNewProduct}>Sisesta</button>
    <div>{message}</div>
  </div>);
}

export default AddProduct;

// Täna
// ID unikaalsuse kontroll  onChange={} -> iga vajutusega funktsiooni käimapanek
// kaardirakendus Leaflet (nagu Google Maps), poed sinna
//          KOJU: print-screenidena poed andmebaasi
// child klassid (props) -> event, data
// Toodete haldamise leht valmis

// T
// ostukorvi kujundus
// toast erinevate lehtede erinev disain

// toodete otsing [ Tablet 10 inc ]  -> iga vajutusega otsib sarnaseid tooteid
// avalehele kategooriate väljakuvamine -> näitab ainult seda kategooriat mille peale vajutati
// dünaamilist CSS klassi 
// pakiautomaadid -> fetch("pakiautomaadid")
//          saan valida, salvestub, pannakse ostukorvi, eemaldatakse ostukorvi,
//          ei saa kogust muuta, alati viimane ostukorvis, ID-ga ei saa lisada
//  https://react-query.tanstack.com/overview

