import { useRef } from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import styles from '../css/Cart.module.css';

function Cart() {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(sessionStorage.getItem("cart")) || []
  );

  const decreaseFromCart = (productIndex) => {
    // const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
    const productClicked = cartProducts[productIndex];
    if (productClicked.product.id === 11122333) {
      return;
    }
    productClicked.quantity--;
    if (productClicked.quantity === 0) {
      removeFromCart(productIndex);
    } else {
      setCartProducts(cartProducts.slice()); 
      sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  const increaseFromCart = (productIndex) => {
    const productClicked = cartProducts[productIndex];
    if (productClicked.product.id === 11122333) {
      return;
    }
    productClicked.quantity++;
    setCartProducts(cartProducts.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  }

  const removeFromCart = (productIndex) => {
    const productClicked = cartProducts[productIndex];
    if (productClicked.product.id === 11122333) {
      return;
    }
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

  const emptyCart = () => {
    setCartProducts([]); 
    sessionStorage.setItem("cart", JSON.stringify([]));
    toast.success("Edukalt kõik ostukorvist kustutatud!", {
      theme: "colored",
      autoClose: 500000,
    });
  }

  // #34d186
  // #ff2800

  return ( 
  <div className={styles.cart}>
    <ToastContainer toastStyle={{ backgroundColor: "#34d186" }} />
    <Button variant="danger" className={styles.ferrariButton} onClick={emptyCart}>TÜHJENDA</Button>
    <div>OSTUKORV ON TÜHI VÕI MINGI TORE PILT</div>
    <div>TOASTIFY ASJAD</div>
    {cartProducts.map((element, index) => 
    <div className={styles.cartProduct}>
      <img className={styles.productImg} src={element.product.imgSrc} alt="" />
      <div className={styles.productName}>{element.product.name}</div>
      <div className={styles.productPrice}>{Number(element.product.price).toFixed(2)} €</div>
      <div className={styles.quantityControls}>
        <img className={styles.productButton + " " + (element.product.id === 11122333 && styles.disabled)} src={require("../assets/minus.png")} alt="" disabled={element.product.id === 11122333} onClick={() => decreaseFromCart(index)} />
        <div>{element.quantity} tk</div>
        <img className={styles.productButton + " " + (element.product.id === 11122333 && styles.disabled)} src={require("../assets/plus.png")} alt="" disabled={element.product.id === 11122333} onClick={() => increaseFromCart(index)} />
      </div>
      <div className={styles.totalSum}>{(element.product.price * element.quantity).toFixed(2)} €</div>
      <img className={styles.productButton + " " + (element.product.id === 11122333 && styles.disabled)} src={require("../assets/delete.png")} alt="" disabled={element.product.id === 11122333} onClick={() => removeFromCart(index)} />
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