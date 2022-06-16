import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function VaataTooteid() {
  // const tootedLocalStoragest = JSON.parse(localStorage.getItem("toodeteV6ti")) || [];
  // const [tootedLocalStoragest, muudaTooted] = useState(JSON.parse(localStorage.getItem("toodeteV6ti")) || []);
  const [tooted, muudaTooted] = useState([]);

  const dbUrl = "https://react-06-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json";

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