import styles from "./Product.module.css";

import { useContext } from "react";
import { CartContext } from "../store/ShoppingCartContext";

function Product({ image, title, price, id }) {
  const { addItemToCart } = useContext(CartContext);
  return (
    <article className={styles.item}>
      <img src={image} alt={title} />
      <div className={styles.content}>
        <div className={styles.text}>
          <h4>{title}</h4>
          <p>{price} هزار تومان</p>
        </div>
        <p className={styles.btnAdd}>
          <button onClick={() => addItemToCart(id)}>افزودن به سبد خرید</button>
        </p>
      </div>
    </article>
  );
}

export default Product;
