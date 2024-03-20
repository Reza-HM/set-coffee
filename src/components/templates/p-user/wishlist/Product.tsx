"use client";
import styles from "./product.module.css";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import swal from "sweetalert";

type CardProps = {
  _id: string;
  price: Number;
  score: Number;
  name: string;
};

const Card = ({ price, score, name, _id }: CardProps) => {
  const removeProduct = () => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/wishlist/${_id}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          swal({
            title: "محصول با موفقیت از علاقه مندی‌ها حذف شد",
            icon: "success",
            buttons: ["بستن", "فهمیدم"],
          }).then(() => {
            location.reload();
          });
        }
      }
    });
  };

  return (
    <div className={styles.card}>
      <Link href={`/product/${_id}`}>
        <img
          width={283}
          height={283}
          src="https://set-coffee.com/wp-content/uploads/2022/03/ethiopia-430x430.png"
          alt=""
        />
      </Link>
      <p dir="rtl">{name}</p>
      <div>
        <div>
          {new Array(score).fill(0).map((item, index) => (
            <IoMdStar key={index} />
          ))}
        </div>
        <span>{price?.toLocaleString()} تومان</span>
      </div>
      <button onClick={removeProduct} className={styles.delete_btn}>
        حذف محصول{" "}
      </button>
    </div>
  );
};

export default Card;
