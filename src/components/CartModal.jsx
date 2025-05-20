import styles from "./CartModal.module.css";
import Cart from "./Cart";
import { createPortal } from "react-dom";
import { useImperativeHandle, useRef } from "react";

function CartModal({ title, actions, ref }) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" className={styles.modal} ref={dialogRef}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" className={styles.form}>
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}

export default CartModal;
