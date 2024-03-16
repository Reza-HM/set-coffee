import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import { IProduct } from "../../../../models/Product";
import { FC } from "react";

const Card = ({ name, price, score }: any) => {
  console.log(name);
  console.log(price);

  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <img
          src="https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png"
          alt=""
        />
        <div className={styles.icons}>
          <Link href="/">
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div>
            <CiHeart />
            <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button>افزودن به سبد خرید</button>
      </div>

      <div className={styles.details}>
        <Link href={"/"}>{name}</Link>
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar key={index} color={index < score ? "gold" : "gray"} />
          ))}
        </div>
        <span>{price} تومان</span>
      </div>
    </div>
  );
};

export default Card;
