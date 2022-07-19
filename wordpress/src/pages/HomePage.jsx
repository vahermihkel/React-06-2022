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