import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const productDbUrl = "https://react-06-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const categoryDbUrl = "https://react-06-webshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const [message, setMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imgSrcRef = useRef();
  const isActiveRef = useRef();
  const navigate = useNavigate()

  useEffect(()=>{
    fetch(categoryDbUrl).then(res => res.json())
      .then(data => {
        const newArray = [];
        for (const key in data) {
         newArray.push(data[key]);
        }
        setCategories(newArray);
      })
    fetch(productDbUrl)
      .then(res => res.json())
      .then(data => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setProducts(newArray);
        const found = newArray.find(element => Number(element.id) === Number(id));
        setProduct(found);
      })
  },[id]);

  // const product = products.find()

  const updateProduct = () => {
    if (nameRef.current.value === "") {
      setMessage("Ei saa ilma nimeta toodet lisada!");
    } else {
      // setMessage("Lisatud edukalt toode " + nameRef.current.value);
      const newProduct = {
        id: Number(idRef.current.value), 
        name: nameRef.current.value, 
        price: Number(priceRef.current.value), 
        category: categoryRef.current.value,
        imgSrc: imgSrcRef.current.value, 
        description: descriptionRef.current.value, 
        isActive: isActiveRef.current.checked
      };
      const index = products.findIndex(element => Number(element.id) === Number(id));
      products[index] = newProduct;
      fetch(productDbUrl, {
        method: "PUT",
        body: JSON.stringify(products),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => navigate("/admin/tooted"));
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
      if (index >= 0 && idRef.current.value !== id) {
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

  return ( 
  <div>
    {product && <div>
      <label>Toote id</label> <br />
      <input ref={idRef} defaultValue={product.id} onChange={() => checkIdUniqueness()} type="number" /> <br />
      <label>Toote nimi</label> <br />
      <input ref={nameRef} defaultValue={product.name} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input ref={priceRef} defaultValue={product.price} type="number" /> <br />
      <label>Toote kirjeldus</label> <br />
      <input ref={descriptionRef} defaultValue={product.description} type="text" /> <br />
      <label>Toote kategooria</label> <br />
      {/* <input ref={categoryRef} type="text" /> <br /> */}
      <select ref={categoryRef} defaultValue={product.category}>
        {/* <option selected disabled>Vali kategooria</option> */}
        {categories.map(element => <option>{element.name}</option>)}
      </select> <br />
      <label>Toote pilt</label> <br />
      <input ref={imgSrcRef} type="text" defaultValue={product.imgSrc} /> <br />
      <label>Toode aktiivne</label> <br />
      <input ref={isActiveRef} type="checkbox" defaultChecked={product.isActive} /> <br />
      <button disabled={buttonDisabled} onClick={updateProduct}>Sisesta</button>
      <div>{message}</div>
    </div>}
  </div> );
}

export default EditProduct;