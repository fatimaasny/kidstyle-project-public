import styles from "./Header.module.css";
import CartModal from "./CartModal";
import { useRef } from "react";

import { useContext } from "react";
import { CartContext } from "../store/ShoppingCartContext";

function Header() {
  const dialog = useRef();

  const { items, updateCartItemQuantity } = useContext(CartContext);

  const cartItemsLength = items.length;
  let modalActions = <button>بستن</button>;
  if (cartItemsLength > 0) {
    modalActions = (
      <>
        <button>بستن</button>
        <button>پرداخت</button>
      </>
    );
  }

  function handleShowModal() {
    // dialog.current.showModal();
    dialog.current.open();
  }
  return (
    <>
      <CartModal title="سبد خرید شما" actions={modalActions} ref={dialog} />
      <header className={styles.header}>
        <h2>مزون کودک ترانه</h2>
        <p className={styles.btnBasket}>
          <button onClick={handleShowModal}>
            سبد خرید : ( {cartItemsLength} )
          </button>
        </p>
      </header>
    </>
  );
}

export default Header;
