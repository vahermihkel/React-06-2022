import { useRef } from "react";
import { useEffect, useState } from "react";

function Cart() {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(sessionStorage.getItem("cart")) || []
  );

  const decreaseFromCart = (productIndex) => {
    // const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
    cartProducts[productIndex].quantity--;
    if (cartProducts[productIndex].quantity === 0) {
      removeFromCart(productIndex);
    } else {
      setCartProducts(cartProducts.slice()); 
      sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  const increaseFromCart = (productIndex) => {
    cartProducts[productIndex].quantity++;
    setCartProducts(cartProducts.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  }

  const removeFromCart = (productIndex) => {
    cartProducts.splice(productIndex, 1);
    setCartProducts(cartProducts.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  }

  const [parcelMachines, setParcelMachines] = useState([]);
  const [selectedPM, setSelectedPM] = useState(sessionStorage.getItem("parcelMachine"));
  const parcelMachineRef = useRef();

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(data => setParcelMachines(data))
  }, []);

  // {-sadasd: {1}, -dasds: {2}, -asdqwe: {3}}
  // ???????????????
  // ->[{},{}]

  const selectParcelMachine = () => {
    setSelectedPM(parcelMachineRef.current.value);
    sessionStorage.setItem("parcelMachine", parcelMachineRef.current.value);
    const newParcelMachine = {
      product: {id: 11122333, name: "Pakiautomaadi tasu", price: 3.5, imgSrc: require("../assets/locker.png")}, 
      quantity: 1
    }
    cartProducts.push(newParcelMachine);
    setCartProducts(cartProducts.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  }

  const deleteSelectedPM = () => {
    setSelectedPM(null);
    sessionStorage.removeItem("parcelMachine");
    cartProducts.pop();
    setCartProducts(cartProducts.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  }

  return ( 
  <div>
    <button>TÜHJENDA -- KODUS</button>
    <div>OSTUKORV ON TÜHI VÕI MINGI TORE PILT</div>
    <div>TOASTIFY ASJAD</div>
    {cartProducts.map((element, index) => 
    <div>
      <img src={element.product.imgSrc} alt="" />
      <div>{element.product.name}</div>
      <div>{element.product.price}</div>
      <button disabled={element.product.id === 11122333} onClick={() => decreaseFromCart(index)}>-</button>
      <div>{element.quantity}</div>
      <button disabled={element.product.id === 11122333} onClick={() => increaseFromCart(index)}>+</button>
      <div>{element.product.price * element.quantity}</div>
      <button disabled={element.product.id === 11122333} onClick={() => removeFromCart(index)}>x</button>
    </div>)}

    { selectedPM === null && cartProducts.length > 0 && <select ref={parcelMachineRef} onChange={selectParcelMachine}>
      {parcelMachines.filter(element => element.A0_NAME === "EE").map(element => 
        <option>{element.NAME}</option>
      )}
    </select>}
    { selectedPM !== null && 
      <div>
        <span>Valitud pakiautomaat: {selectedPM} </span>
        <button onClick={deleteSelectedPM}>X</button> 
      </div>}

    <button>MAKSMA -- KODUS</button>
  </div> );
}

export default Cart;