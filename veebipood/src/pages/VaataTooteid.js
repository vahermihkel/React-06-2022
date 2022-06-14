import { useState } from "react";
import { Link } from "react-router-dom";

function VaataTooteid() {
  // const tootedLocalStoragest = JSON.parse(localStorage.getItem("toodeteV6ti")) || [];
  const [tootedLocalStoragest, muudaTooted] = useState(JSON.parse(localStorage.getItem("toodeteV6ti")) || []);

  const kustutaToode = (index) => {
    tootedLocalStoragest.splice(index,1);
    localStorage.setItem("toodeteV6ti", JSON.stringify(tootedLocalStoragest));
    muudaTooted(tootedLocalStoragest.slice());
  }

  return (<div>{tootedLocalStoragest.map((elementListist, index) => 
    <div>
        <div>{ elementListist.nimi }</div>
        <div>{ elementListist.hind }</div>
        <Link to={"/muuda/" + elementListist.nimi.toLowerCase().replaceAll(" ", "-")}>
          <button>Muuda</button>
        </Link>
        <button onClick={() => kustutaToode(index)}>Kustuta</button>
    </div>)}</div>);
}

export default VaataTooteid;