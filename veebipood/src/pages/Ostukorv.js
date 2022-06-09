import { useState } from "react";

function Ostukorv() {
  //const ostukorviTooted = JSON.parse(sessionStorage.getItem("ostukorviTooted")) || [];
  const [ostukorviTooted, uuendaOstukorvi] = useState(
    JSON.parse(sessionStorage.getItem("ostukorviTooted")) || []
  );

  const lisaOstukorvi = (klikitudToode) => {
    ostukorviTooted.push(klikitudToode); // lisan juurde
    uuendaOstukorvi(ostukorviTooted.slice()); // uuendan HTMLi (teeb koopia)
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviTooted)); // salvestan mällu
  }

  const kustutaOstukorvist = (klikitudToode) => {
    const j2rjekorraNumber = ostukorviTooted.indexOf(klikitudToode); // otsin järjekorranumbri
    ostukorviTooted.splice(j2rjekorraNumber, 1); // kustutan järjekorranumbri alusel ja pean ütlema et 1tk
    uuendaOstukorvi(ostukorviTooted.slice()); // uuendan HTMLi (teeb koopia)
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviTooted)); // salvestan mällu
  }

  const tyhjenda = () => {
    uuendaOstukorvi([]); // uuendan HTMLi (teeb koopia)
    sessionStorage.setItem("ostukorviTooted", JSON.stringify([])); // salvestan mällu
  }

  const arvutaKogusumma = () => {
    let ostukorviSumma = 0;
    // arvutan JS calculate object array total
    //[{n: "C", h: 12}, {n: "F", h: 5}, {n: "S", h: 8}]  .forEach()
    //    .forEach({n: "C", h: 12} =>  12  =  0  +  12  )
    //    .forEach({n: "F", h: 5} =>  17   =   12  +  5  )
    //    .forEach({n: "S", h: 8} =>  25   =    17  + 8  )
    ostukorviTooted.forEach(element => ostukorviSumma += Number(element.hind));
    return ostukorviSumma;
  }

  const maksma = () => {
    // EveryPay-sse makse
    // API päringud
    // fetch()  <--- tavaline JavaSript HTTP päring
  }

  return (<div>
    {ostukorviTooted.length === 0 && <div>Ostukorv on tühi</div>}
    {ostukorviTooted.length > 0 && <button onClick={tyhjenda}>Tühjenda</button>}
    {ostukorviTooted.map((elementListist, index) => 
    <div key={index}>
      <div>{ elementListist.nimi }</div>
      <div>{ elementListist.hind }</div>
      <button onClick={() => lisaOstukorvi(elementListist)}>Lisa</button>
      <button onClick={() => kustutaOstukorvist(elementListist)}>Kustuta</button>
    </div>
    )}
  { ostukorviTooted.length > 0 &&  <div>Kokku: {arvutaKogusumma()} €</div>}
  { ostukorviTooted.length > 0 &&  <button onClick={maksma}>Maksma</button>}
    </div>);
}

export default Ostukorv;