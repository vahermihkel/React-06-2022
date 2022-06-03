
function Avaleht() {
  const tootedLocalStoragest = JSON.parse(localStorage.getItem("toodeteV6ti")) || [];

  // 1. lisamine ostukorvi --> sessionStorage-sse
  // 2. kuvame ostukorvis kõik tooted
  // 3. võimaldame ostukorvi seda sama toodet juurde lisada -- .push()
  // 4. võimaldame ostukorvist seda toodet kustutada -- .splice()
  // 5. võimaldame ostukorvi tühjendada   -> ostukorviTooted = [];
  // 6. ------> objektide juurde
  // 7. igale tootele ka hind   {nimi: "Coca", hind: 6}
  // [{nimi: "Coca", hind: 6}, {nimi: "Fanta", hind: 6}, {nimi: "Vitamin well", hind: 6}]
  // 8. ostukorvis kogusumma kokku arvutada     .forEach(elementListist => ...)

  const lisaOstukorvi = (klikitudToode) => {
    // "ostukorviTooted"
    // sessionStorage.setItem("ostukorviTooted", ostukorviTootedSessionist);
  }

  return (<div>{tootedLocalStoragest.map(elementListist => 
    <div>
      { elementListist }
      <button onClick={() => lisaOstukorvi(elementListist)}>Lisa ostukorvi</button>
    </div>)}</div>);
}

export default Avaleht;