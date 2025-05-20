import styles from "./Cart.module.css";
import { useContext, useRef } from "react";
import { CartContext } from "../store/ShoppingCartContext";
import { FaTrash } from "react-icons/fa6";
import DeleteItemModal from "./DeleteItemModal";

function Cart() {
  const { items, updateCartItemQuantity, deleteItemCart } =
    useContext(CartContext);
  const dialogRef = useRef();
  const idRef = useRef();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  let modalActions = (
    <div className={styles.modalActions}>
      <button
        onClick={() => {
          deleteItemCart(idRef.current);
        }}
      >
        بله مطمئنم
      </button>
      <button>نه پشیمون شدم</button>
    </div>
  );

  function handleShowDeleteItemModal() {
    dialogRef.current.showModal();
  }

  return (
    <>
      <DeleteItemModal
        title={"آیا می خواهید این محصول را از سبد خرید حذف کنید؟"}
        actions={modalActions}
        ref={dialogRef}
      />
      <div className={styles.cart}>
        {items.length === 0 && <p>هنوز محصولی انتخاب نکرده اید.</p>}
        {items.length > 0 && (
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.text}>
                  <span>{item.title}</span>
                  <span>{item.price} هزار تومان</span>
                </div>

                <div className={styles.actions}>
                  <button onClick={() => updateCartItemQuantity(item.id, 1)}>
                    +
                  </button>
                  <span> {item.quantity} </span>
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateCartItemQuantity(item.id, -1);
                      } else {
                        idRef.current = item.id;
                        handleShowDeleteItemModal();
                      }
                    }}
                  >
                    -
                  </button>
                  <button
                    className={styles.btnTrash}
                    onClick={() => {
                      idRef.current = item.id;
                      handleShowDeleteItemModal();
                    }}
                  >
                    <FaTrash color="d8094e" fontSize="1rem" scale="hover:1.2" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className={styles["total-price"]}>
          مجموع سبد خرید شما : <strong>{totalPrice} هزار تومان</strong>
        </p>
      </div>
    </>
  );
}

export default Cart;
