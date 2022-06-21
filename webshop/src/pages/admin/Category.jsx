import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function Category() {
  const idRef = useRef();
  const nameRef = useRef();
  const [message, setMessage] = useState("");

  const [categories, setCategories] = useState([]);
  const categoryDb = "https://react-06-webshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  useEffect(() => {
    fetch(categoryDb).then(res => res.json())
      .then(data => {
        const newArray = [];
        for (const key in data) {
         newArray.push(data[key]);
        }
        setCategories(newArray);
      })
  },[]);

  const addNewCategory = () => {
    if (nameRef.current.value === "") {
      setMessage("Ei saa ilma nimeta kategooriat lisada!");
    } else {
      setMessage("Lisatud edukalt kategooria " + nameRef.current.value);
      const newCategory = {
        id: idRef.current.value, 
        name: nameRef.current.value
      };
      categories.push(newCategory);
      setCategories(categories.slice());
      fetch(categoryDb, {
        method: "POST",
        body: JSON.stringify(newCategory),
        headers: {
          "Content-Type": "application/json"
        }
      });
      // toast.success("Edukalt uus kategoora " + nameRef.current.value + " lisatud")
      toast.success(`Edukalt uus kategooria ${nameRef.current.value} lisatud`)
    }
  }

  const deleteCategory = (index) => {
    const categoryName = categories[index].name;
    categories.splice(index,1);
    setCategories(categories.slice()); 
    fetch(categoryDb, {
      method: "PUT",
      body: JSON.stringify(categories),
      headers: {
        "Content-Type": "application/json"
      }
    });
    toast.success(`Edukalt kategooria ${categoryName} kustutatud`)
  }

  // splice - kustutamiseks/muutmiseks Array-st, 
  // slice - Array koopia tegemiseks(tüki võtmiseks), 
  // split - stringist array tegemiseks      "Elas metsas mutionu,".split(" ")  --> ["Elas", "metsas", "mutionu,"]
  //      "Elas metsas mutionu,".split("a")  --> ["El", "s mets", "s mutionu,"]
  //  ["El", "s mets", "s mutionu,"].join("o")  => "Elos metsos mutionu,"
  // replaceAll("a", "o")
  // Elasometsasomutionu,

  return ( 
    <div>
      <label>Kategooria ID</label><br />
      <input ref={idRef} type="number" /><br />
      <label>Kategooria nimi</label><br />
      <input ref={nameRef} type="text" /><br />
      <button onClick={addNewCategory}>Sisesta</button>
      <div>{message}</div>
      <br /><br />
      {categories.map((element, index) => 
        <div key={element.id}>
          <span>{element.name} </span>
          <button onClick={() => deleteCategory(index)}>X</button> 
        </div>)}
      <ToastContainer />
    </div> );
}

export default Category;