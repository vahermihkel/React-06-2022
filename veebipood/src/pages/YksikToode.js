import { useParams } from "react-router-dom";

function YksikToode() {
  const { tooteNimi } = useParams();

  const tooted = JSON.parse(localStorage.getItem("toodeteV6ti")) || [];

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