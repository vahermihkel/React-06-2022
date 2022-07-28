import { useEffect, useRef, useState } from "react";
import FileUpload from "../../components/FileUpload";
import { ProductModel } from "../../models/Product.model";

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imgSrcRef = useRef();
  const isActiveRef = useRef();
  
  const [message, setMessage] = useState<string>("");
  const productDbUrl = "https://react-06-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [categories, setCategories] = useState<string[]>([]);
  const categoryDbUrl = "https://react-06-webshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const [productImg, setProductImg] = useState<string>("");
  const imgUrlRef = useRef();
  const imgFileRef = useRef();
  const [showUrlUpload, setShowUrlUpload] = useState<boolean>(false);

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
        imgSrc: productImg,
        description: descriptionRef.current.value, 
        isActive: isActiveRef.current.checked
      };
      fetch(productDbUrl, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => emptyForm());
    }
  }

  const emptyForm = () => {
    idRef.current.value = ""
    nameRef.current.value = ""
    priceRef.current.value = "" 
    categoryRef.current.value = ""
    imgSrcRef.current.value = "";
    descriptionRef.current.value = "" 
    isActiveRef.current.checked = false;
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
      } else if (idRef.current.value === "11122333") {
        setMessage("Sisestasid pakiautomaadi ID!");
        setButtonDisabled(true);
      } else {
        setMessage("");
        setButtonDisabled(false);
      }
    } else {
      setMessage("");
      setButtonDisabled(true);
    }
  }

  const radioChecked = () => {
    if (imgUrlRef.current.checked) {
      setShowUrlUpload(true);
    } else {
      setShowUrlUpload(false);
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
    <select ref={categoryRef} defaultValue="">
      <option value="" disabled>Vali kategooria</option>
      {categories.map(element => <option key={element.name}>{element.name}</option>)}
    </select> <br />
    <label>Toote pilt </label> <br />
    {productImg === "" && <div>
      <label htmlFor="url"> URL</label>
      <input id="url" ref={imgUrlRef} onChange={radioChecked} name="imgSrc" type="radio" />
      <label htmlFor="file">FAIL</label>
      <input id="file" ref={imgFileRef} defaultChecked onChange={radioChecked} name="imgSrc" type="radio" />
      <br />
    </div>}
    {showUrlUpload === true && <div><input ref={imgSrcRef} type="text" /></div>}
    {productImg === "" && showUrlUpload === false && <FileUpload onSendPictureUrl={setProductImg} />}
    {productImg !== "" && <div><i>Pilt üles laetud</i></div>}
    <label>Toode aktiivne</label> <br />
    <input ref={isActiveRef} type="checkbox" /> <br />
    <button disabled={buttonDisabled} onClick={addNewProduct}>Sisesta</button>
    <div>{message}</div>
  </div>);
}

export default AddProduct;

// toodete otsing [ Tablet 10 inc ]  -> iga vajutusega otsib sarnaseid tooteid
// avalehele kategooriate väljakuvamine -> näitab ainult seda kategooriat mille peale vajutati

// pakiautomaadid -> fetch("pakiautomaadid")
//          saan valida, salvestub, pannakse ostukorvi, eemaldatakse ostukorvi,
//          ei saa kogust muuta, alati viimane ostukorvis, ID-ga ei saa lisada
//  https://react-query.tanstack.com/overview

// ostukorvi kujundus
// toast erinevate lehtede erinev disain
// dünaamilist CSS klassi 

