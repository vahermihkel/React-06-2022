import { useRef, useState } from "react";

// SALVESTADA SAAB:
// 1. Brauseri Storage-sse
// 2. Andmebaas
// 3. Fail/Excel

function TooteLisamine() {
  const nimiRef = useRef();
  const priceRef = useRef();
  const isActiveRef = useRef();
  // vasak pool - HTMLi     ja ta saab väärtuse esialgu useState(-->SIIT<---)
  // parem pool - JavaScriptis, funktsioon mis annab UUE VÄÄRTUSE
  //              m22raS6num(-->SIIT<---)
  const [s6num, m22raS6num] = useState("");

  const lisaToode = () => {
    console.log("funktsioon töötab");
    console.log("VAJUTUSE HETKEL REF VÄÄRTUS " + nimiRef.current.value);
    if (nimiRef.current.value === "") {
      m22raS6num("Ei saa ilma nimeta toodet lisada!");
    } else {
      m22raS6num("Lisatud edukalt toode " + nimiRef.current.value);
      let tootedLocalStoragest = localStorage.getItem("toodeteV6ti");
      tootedLocalStoragest = JSON.parse(tootedLocalStoragest) || [];
      const uusToode = {
        nimi: nimiRef.current.value, 
        hind: priceRef.current.value, 
        aktiivne: isActiveRef.current.checked
      };
      tootedLocalStoragest.push(uusToode);
      tootedLocalStoragest = JSON.stringify(tootedLocalStoragest);
      localStorage.setItem("toodeteV6ti", tootedLocalStoragest);
    }
  }

  return (
  <div>
    <label>Toote nimetus</label> <br />
    <input ref={nimiRef} type="text" /> <br />
    <label>Toote hind</label> <br />
    <input ref={priceRef} type="number" /> <br />
    <label>Toode aktiivne</label> <br />
    <input ref={isActiveRef} type="checkbox" /> <br />
    <button onClick={lisaToode}>Sisesta</button>
    <div>{s6num}</div>
  </div>);
}

export default TooteLisamine;

// KUI LISAN VIIMASE:
// localStorage.setItem("toodeteV6ti", nimiRef.current.value);

// Kui tahan lisada varasematele juurde
// 1. võtan mis on varem localStorage-s         localStorage.getItem("VÕTI")
// 2. kuna kõik on localStorage-s Stringi kujul, aga mul on array/list/massiiv kuju
// 2. pean võtma jutumärgid ära               JSON.parse()
// 3. lisan ühe juurde                         .push()
// 4. panen jutumärgid array-le tagasi        JSON.stringify()
//!! localStorage-sse pandud asjad peavad kõik olema string kujul
// 5. panen localStoragesse                     localStorage.setItem("VÕTI", lisatav_väärtus)