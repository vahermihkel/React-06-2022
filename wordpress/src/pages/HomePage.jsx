import ProductsFromWordpress from '../products.json';

function HomePage() {
    // HILJEM - fetch kaudu kõik tooted
  const products = ProductsFromWordpress;

  // COPY-PASTE OSTUKORVI LISAMINE
  // sessionStorage.    "cart"
  const addToCart = (productClicked) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const index = cart.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cart[index].quantity++;
    } else {
      const newProduct = {product: productClicked, quantity: 1};
      cart.push(newProduct);
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  return ( 
    <div>
      {products.map(element => 
      <div>
        <div>{element.id}</div>
        <div>{element.name}</div>
        <div>{element.price} €</div>
        <button onClick={() => addToCart(element)}>Lisa ostukorvi</button>
      </div>)}
    </div> );
}

export default HomePage;

// 70 / 4 = 17.5
// 16
// 21.juuli 2ak/h ---> makse --- 14.30
// 26.juuli 3ak/h ---> 13.00-15.15 Wordpressi API päringud (toodete võtmine, tellimuste lisamine, tellimuste muutmine)
// 28.juuli 3ak/h ---> 13.00-15.15 proovitöö lõpuni tegemisega,  React-Query, TypeScript
//allkirjaleht: 4.august 2ak/h ---> iseseisva projekti analüüs 

// tegelikult: 19.august 2ak/h R 13.00-14.30