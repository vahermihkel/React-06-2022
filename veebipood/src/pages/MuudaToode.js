import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const { nimi } = useParams();
  const tooted = JSON.parse(localStorage.getItem("toodeteV6ti")) || [];
  const toode = tooted.find(element => element.nimi.toLowerCase().replaceAll(" ", "-") === nimi);
  const index = tooted.indexOf(toode);

  const nimiRef = useRef();
  const priceRef = useRef();
  const isActiveRef = useRef();
  const [s6num, m22raS6num] = useState("");

  const navigate = useNavigate();

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
      localStorage.setItem("toodeteV6ti", JSON.stringify(tooted));
      navigate("/tooted")
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