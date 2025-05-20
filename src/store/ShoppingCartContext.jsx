import { createContext, useReducer, useState } from "react";
import { MY_LIST } from "../My_List";

export const CartContext = createContext({
  items: [], // یعنی یک آرایه است
  addItemToCart: () => {}, // یعنی یک تابع هست
  updateCartItemQuantity: () => {}, // یعنی یک تابع هست
  deleteItemCart: () => {},
});

export default function CartContextProvider({ children }) {
  function cartReducer(state, action) {
    if (action.type === "ADD_CART_ITEM") {
      const updatedCart = [...state.items];

      const existingCartIndex = updatedCart.findIndex(
        (item) => item.id === action.payload.id
      );
      // const existingCart = { ...updatedCart[existingCartIndex] }; //  نه به روش  کپی کنیم اینجوری خالی هست و توی لیست موجود هست یعنی

      const existingCart = updatedCart[existingCartIndex]; // چون میخوایم ببینیم توی لیست خرید هستش یا نه باید این مدلی بگیریمش از لیست

      if (existingCart) {
        // توی لیست خرید هست میایم و به کوآنتیتی اون یکی اضافه کنیم
        const updatedItem = {
          ...existingCart,
          quantity: existingCart.quantity + 1,
        };
        updatedCart[existingCartIndex] = updatedItem;
      } else {
        // توی لیست خرید نیست بریم از لیستی اصلی محصولات بگیریمش و پوش کنیم به لیست خردی و کوآنتیتی رو براش 1 بزاریم
        const item = MY_LIST.find((item) => item.id === action.payload.id);
        updatedCart.push({
          id: action.payload.id,
          title: item.title,
          price: item.price,
          quantity: 1,
        });
      }
      return {
        // اگه چیزی غیر از آیتم ها داخل استیت باشه
        // ...state , items:updatedCart
        items: updatedCart,
      };
    } else if (action.type === "UPDATE_CART_ITEM") {
      const updatedCart = [...state.items];

      const itemIndex = updatedCart.findIndex(
        (item) => item.id === action.payload.id
      );
      const item = { ...updatedCart[itemIndex] }; // اینجا میدونیم حتما توی لیست هست و کپی میگیریم از مقدارهاش
      item.quantity += action.payload.amount;

      if (item.quantity <= 0) {
        updatedCart.splice(itemIndex, 1); // delete this product from list
      } else {
        updatedCart[itemIndex] = item; // update details of product
      }

      return {
        // اگه چیزی غیر از آیتم ها داخل استیت باشه

        items: updatedCart,
      };
    } else if (action.type === "DELETE-ITEM-CART") {
      const updatedCart = [...state.items];
      const newCart = updatedCart.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        items: newCart,
      };
    }
  }
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });
  // const [shoppingCart, setShoppingCart] = useState({ items: [] });
  function handleAddItemToCart(id) {
    cartDispatch({ type: "ADD_CART_ITEM", payload: { id } });
    // setShoppingCart((prevShoppingCart) => {
    //   const updatedCart = [...prevShoppingCart.items];
    //   const existingCartIndex = updatedCart.findIndex((item) => item.id === id);
    //   // const existingCart = { ...updatedCart[existingCartIndex] }; //  نه به روش  کپی کنیم اینجوری خالی هست و توی لیست موجود هست یعنی
    //   const existingCart = updatedCart[existingCartIndex]; // چون میخوایم ببینیم توی لیست خرید هستش یا نه باید این مدلی بگیریمش از لیست
    //   if (existingCart) {
    //     // توی لیست خرید هست میایم و به کوآنتیتی اون یکی اضافه کنیم
    //     const updatedItem = {
    //       ...existingCart,
    //       quantity: existingCart.quantity + 1,
    //     };
    //     updatedCart[existingCartIndex] = updatedItem;
    //   } else {
    //     // توی لیست خرید نیست بریم از لیستی اصلی محصولات بگیریمش و پوش کنیم به لیست خردی و کوآنتیتی رو براش 1 بزاریم
    //     const item = MY_LIST.find((item) => item.id === id);
    //     updatedCart.push({
    //       id: id,
    //       title: item.title,
    //       price: item.price,
    //       quantity: 1,
    //     });
    //   }
    //   return {
    //     items: updatedCart,
    //   };
    // });
  }

  function handleUpdateCartItemQuantity(id, amount) {
    cartDispatch({ type: "UPDATE_CART_ITEM", payload: { id, amount } });
    // setShoppingCart((prevShoppingCart) => {
    //   const updatedCart = [...prevShoppingCart.items];
    //   const itemIndex = updatedCart.findIndex((item) => item.id === id);
    //   const item = { ...updatedCart[itemIndex] }; // اینجا میدونیم حتما توی لیست هست و کپی میگیریم از مقدارهاش
    //   item.quantity += amount;
    //   if (item.quantity <= 0) {
    //     updatedCart.splice(itemIndex, 1); // delete this product from list
    //   } else {
    //     updatedCart[itemIndex] = item; // update details of product
    //   }
    //   return {
    //     items: updatedCart,
    //   };
    // });
  }

  function handleDeleteItemCart(id) {
    cartDispatch({ type: "DELETE-ITEM-CART", payload: { id } });
  }

  const ctxValue = {
    // items: shoppingCart.items,
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
    deleteItemCart: handleDeleteItemCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
