import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function YksikToode() {
  const { tooteNimi } = useParams();

  // const tooted = JSON.parse(localStorage.getItem("toodeteV6ti")) || [];

  const [tooted, uuendaTooted] = useState([]);

  const dbUrl = "https://react-06-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json";

  useEffect(()=>{
    fetch(dbUrl).then(tagastus => tagastus.json()).then(sisu => {
      const fBaseTooted = [];
      for (const key in sisu) {
        fBaseTooted.push(sisu[key]);
      }
      uuendaTooted(fBaseTooted)
     } );
  },[])

                    // [{nimi: 'F', hind: '14', aktiivne: true},{nimi: 'Coca cola', hind: '14', aktiivne: true}]
  
                                                      // true/false
  const toode = tooted.find(element => element.nimi.toLowerCase().replaceAll(" ", "-") === tooteNimi);

  return (<div>
    { toode && <div>
      <div>{toode.nimi}</div>
      <div>{toode.hind}</div>
    </div>}
    { !toode && <div>
        Toodet ei leitud
    </div>}
  </div>)
}

export default YksikToode;