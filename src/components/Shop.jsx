import styles from "./Shop.module.css";

import { MY_LIST } from "../My_List.js";

import Product from "./Product.jsx";

function Shop() {
  return (
    <section className={styles.shop}>
      <ul className={styles["cart-items"]}>
        {MY_LIST.map((item) => (
          <li key={item.id}>
            <Product {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Shop;
