import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const { nimi } = useParams();
  // const tooted = JSON.parse(localStorage.getItem("toodeteV6ti")) || [];
  const [tooted, uuendaTooted] = useState([]);
  const dbUrl = "https://react-06-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json";
  const nimiRef = useRef();
  const priceRef = useRef();
  const isActiveRef = useRef();
  const [s6num, m22raS6num] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    fetch(dbUrl).then(tagastus => tagastus.json()).then(sisu => {
      const fBaseTooted = [];
      for (const key in sisu) {
        fBaseTooted.push(sisu[key]);
      }
      uuendaTooted(fBaseTooted)
     } );
  },[])
  const toode = tooted.find(element => element.nimi.toLowerCase().replaceAll(" ", "-") === nimi);
  const index = tooted.indexOf(toode);


  const uuendaToode = () => {
    if (nimiRef.current.value === "") {
      m22raS6num("Ei saa ilma nimeta toodet uuendada!");
    } else {
      const uuendatudToode = {
        nimi: nimiRef.current.value, 
        hind: priceRef.current.value, 
        aktiivne: isActiveRef.current.checked
      };
      // tootedLocalStoragest.push(uusToode);
      tooted[index] = uuendatudToode;
      // tooted = JSON.stringify(tooted);
      // localStorage.setItem("toodeteV6ti", JSON.stringify(tooted));
      fetch(dbUrl, {
        method: "PUT",
        body: JSON.stringify(tooted),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => navigate("/tooted"))
      
      // m22raS6num("Muudetud edukalt toode " + nimiRef.current.value);
    }
  }

  return (
  <div>
    { toode && <div>
      <label>Toote nimetus</label> <br />
      <input ref={nimiRef} defaultValue={toode.nimi} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input ref={priceRef} defaultValue={toode.hind} type="number" /> <br />
      <label>Toode aktiivne</label> <br />
      <input ref={isActiveRef} defaultChecked={toode.aktiivne} type="checkbox" /> <br />
      <button onClick={uuendaToode}>Sisesta</button>
      <div>{s6num}</div>
    </div>}
    { !toode && <div>Toodet ei leitud</div> }
  </div>);
}

export default MuudaToode;