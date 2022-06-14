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
    const makseAndmed = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": arvutaKogusumma(),
      "order_reference": Math.floor(Math.random()*899999+100000),
      "nonce": "a9b7f7e7154a01b" + Math.floor(Math.random()*899999+100000) + new Date(),
      "timestamp": new Date(),
      "customer_url": "https://react-06-22.web.app"
    }
    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
      method: "POST",
      body: JSON.stringify(makseAndmed),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    }).then(tagastus => tagastus.json())
    .then(sisu => window.location.href = sisu.payment_link);
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