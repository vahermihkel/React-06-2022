import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function VaataTooteid() {
  // const tootedLocalStoragest = JSON.parse(localStorage.getItem("toodeteV6ti")) || [];
  // const [tootedLocalStoragest, muudaTooted] = useState(JSON.parse(localStorage.getItem("toodeteV6ti")) || []);
  const [tooted, muudaTooted] = useState([]);

  const dbUrl = "http://localhost/wordpress/wp-json/wc/v1/products?consumer_key=ck_d6d0ac010b6c7ad2ac19d2e06c5f0cf5a14b87ba&consumer_secret=cs_b508ece4284e6793c2b7803e957bc659e7226ecf";

  useEffect(()=>{
    fetch(dbUrl).then(tagastus => tagastus.json()).then(sisu => {
      const fBaseTooted = [];
      for (const key in sisu) {
        fBaseTooted.push(sisu[key]);
      }
      muudaTooted(fBaseTooted)
     } );
  },[])

  const kustutaToode = (index) => {
    tooted.splice(index,1);
    // localStorage.setItem("toodeteV6ti", JSON.stringify(tootedLocalStoragest));
    fetch(dbUrl, {
      method: "PUT",
      body: JSON.stringify(tooted),
      headers: {
        "Content-Type": "application/json"
      }
    })
    muudaTooted(tooted.slice());
  }

  return (<div>{tooted.map((elementListist, index) => 
    <div key={elementListist.nimi}>
        <div>{ elementListist.nimi }</div>
        <div>{ elementListist.hind }</div>
        <Link to={"/muuda/" + elementListist.nimi.toLowerCase().replaceAll(" ", "-")}>
          <button>Muuda</button>
        </Link>
        <button onClick={() => kustutaToode(index)}>Kustuta</button>
    </div>)}</div>);
}

export default VaataTooteid;