import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Avaleht() {

  // const tootedLocalStoragest = JSON.parse(localStorage.getItem("toodeteV6ti")) || [];

  // 1. lisamine ostukorvi --> sessionStorage-sse
  // 2. kuvame ostukorvis kõik tooted
  // 3. võimaldame ostukorvi seda sama toodet juurde lisada -- .push()
  // 4. võimaldame ostukorvist seda toodet kustutada -- .splice()
  // 5. võimaldame ostukorvi tühjendada   -> ostukorviTooted = [];
  // 6. ------> objektide juurde
  // 7. igale tootele ka hind   {nimi: "Coca", hind: 6}
  // [{nimi: "Coca", hind: 6}, {nimi: "Fanta", hind: 6}, {nimi: "Vitamin well", hind: 6}]
  // 8. ostukorvis kogusumma kokku arvutada     .forEach(elementListist => ...)
  const [tooted, uuendaTooted] = useState([]);

  const dbUrl = "http://localhost/wordpress/wp-json/wc/store/products";

  useEffect(()=>{
    fetch(dbUrl).then(tagastus => console.log(tagastus)).then(sisu => {
      // console.log(sisu);
      // {-N4: {…}, -Mr: {…}, -KA: {…}}  -----> [{…},{…},{…}]
      // uuendaTooted(sisu);
      const fBaseTooted = [];
      for (const key in sisu) {
        fBaseTooted.push(sisu[key]);
      }
  
      uuendaTooted(fBaseTooted)
     } );
  },[])
  

  console.log("tuleb alati enne");
  console.log(tooted);

  const lisaOstukorvi = (klikitudToode) => {
    // "ostukorviTooted"
    let ostukorv = sessionStorage.getItem("ostukorviTooted");
    ostukorv = JSON.parse(ostukorv) || [];
    ostukorv.push(klikitudToode);
    ostukorv = JSON.stringify(ostukorv);
    sessionStorage.setItem("ostukorviTooted", ostukorv);
  }

  return (<div>{tooted.map(elementListist => 
    <div key={elementListist.nimi}>
      {/* <Link to={`/toode/${elementListist.nimi}`}></Link> */}
      <Link to={"/toode/" + elementListist.nimi.toLowerCase().replaceAll(" ", "-")}>
        <div>{ elementListist.nimi }</div>
        <div>{ elementListist.hind }</div>
      </Link>
      <button onClick={() => lisaOstukorvi(elementListist)}>Lisa ostukorvi</button>
    </div>)}</div>);
}

export default Avaleht;