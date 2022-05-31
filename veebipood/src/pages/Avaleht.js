import { useState } from "react";

function Avaleht() {
  // let synniaeg = "1913.12.31";
  const isikukood = "41513123113";
  const [synniaeg, uuendaSynniaeg] = useState("1913.12.31");
  const [s6naline, uuendaS6naline] = useState("algväärtus");
  const [numbriline, uuendaNumbriline] = useState(12313);
  const [kahendV22rtus, uuendaKahendV22rtus] = useState(true);

  const muudaSynniaega = () => {
    // synniaeg = "123123123";
    uuendaSynniaeg("19"+isikukood.substring(1,3)+"."+isikukood.substring(3,5)+"."+isikukood.substring(5,7));
    console.log(synniaeg);
  }

  const muudaMuutujad = () => {
    uuendaS6naline("uus väärtus");
    uuendaNumbriline(4312);
    uuendaKahendV22rtus(false);
  }

  return (
    <div>
      <br />
      <div>Isikukood: {isikukood}</div>
      <button onClick={() => muudaSynniaega()}>Arvuta sünniaeg isikukoodi järgi</button>
      <br /><br />
      <div>Sünniaeg: {synniaeg} </div>
     { kahendV22rtus && <div>Nimi: Juku Kask</div>}
     { numbriline < 10000 && <div>{s6naline}</div>}
      <div>{numbriline}</div>
      <div>{kahendV22rtus + kahendV22rtus}</div>
      <button onClick={() => muudaMuutujad()}>Muuda kõik muutujad</button>
    </div>);
}

export default Avaleht;