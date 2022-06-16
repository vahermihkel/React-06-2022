
function Poed() {

  return (
  <div>
    <div>Poe nimi: Kristiine outlet</div>
    <div>Poe asukoht: Kristiine keskus</div>
    <div>Poe lahtiolekuaeg: E-P 10-21</div>
    <br />
    <div>Poe nimi: Mustamäe outlet</div>
    <div>Poe asukoht: Mustika keskus</div>
    <div>Poe lahtiolekuaeg: E-P 10-22</div>
    <br />
    <div>Poe nimi: Ülemiste outlet</div>
    <div>Poe asukoht: Ülemiste keskus</div>
    <div>Poe lahtiolekuaeg: E-P 9-21</div>
    <br />
    <div>Poe nimi: Tasku outlet</div>
    <div>Poe asukoht: Tasku keskus</div>
    <div>Poe lahtiolekuaeg: E-P 10-21</div>

    <br /><br />
    <div>Meie meeskond:</div>
    <br />
   { ["Mart Poom", "Paavo Järvi", "Kerttu Jukkum"].map(listiElement =>  
   <div key={listiElement}>
      <div>Liikme nimi: {listiElement}</div>
      <div>Valdkond: Turundus</div>
      <div>Asukoht: Peakontor</div>
      <br />
    </div>) }
  </div>);
}

export default Poed;