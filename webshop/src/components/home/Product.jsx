import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Product(props) {
  const { t } = useTranslation();

  const addToCart = (productClicked) => {
    const cartProducts = JSON.parse(sessionStorage.getItem("cart")) || [];
    const index = cartProducts.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cartProducts[index].quantity++;
    } else {
      const index = cartProducts.findIndex(element => element.product.id === 11122333)
      if (index >= 0) {
        cartProducts.splice(cartProducts.length-1, 0, {product: productClicked, quantity: 1});
      } else {
        cartProducts.push({product: productClicked, quantity: 1});
      }
    }
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    toast.success(t("home.cart-added"),{
      position: "bottom-right",
      theme: "dark"
    });
  }

  return ( 
    <div>
      <Link to={`toode/${props.element.id}`}>
        <img src={props.element.imgSrc} alt="" />
        <div>{props.element.name}</div>
        <div>{props.element.price}</div>
        <div>{props.element.id}</div>
      </Link>
      <button onClick={() => addToCart(props.element)}>{t("home.add-cart-button")}</button>
    </div>
   );
}

export default Product;