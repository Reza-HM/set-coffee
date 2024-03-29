"use client";
import { useState } from "react";
import styles from "./addToCart.module.css";
import { showSwal } from "@/utils/helpers";

type AddToCartProps = {
  productID: string;
  name: string;
  price: number;
};

type CartItemType = {
  id: string;
  name: string;
  count: number;
  price: number;
};

const AddToCart = ({ name, price, productID }: AddToCartProps) => {
  const [count, setCount] = useState(1);

  const addProductToCart = () => {
    const cartString: string | null = localStorage.getItem("cart");

    const cart: CartItemType[] = (
      cartString ? JSON.parse(cartString) : []
    ) as CartItemType[];

    const cartItem = {
      id: productID,
      name,
      price,
      count,
    };

    cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));
    showSwal("محصول با موفقیت به سبد خرید اضافه شد", "success", "فهمیدم");
  };

  return (
    <div className={styles.cart}>
      <button onClick={addProductToCart}>افزودن به سبد خرید</button>
      <div>
        <span
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
            }
          }}
        >
          -
        </span>
        {count}
        <span onClick={() => setCount(count + 1)}>+</span>
      </div>
    </div>
  );
};
export default AddToCart;
