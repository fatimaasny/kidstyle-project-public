import { createPortal } from "react-dom";
import styles from "./DeleteItemModal.module.css";

function DeleteItemModal({ ref, actions, title }) {
  return createPortal(
    <dialog ref={ref} className={styles.dialog}>
      <h2>{title}</h2>
      <form method="dialog">{actions}</form>
    </dialog>,
    document.getElementById("modal")
  );
}

export default DeleteItemModal;
