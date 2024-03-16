"use client";
import { FaFacebookF, FaStar, FaTwitter } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import { IProduct } from "../../../../models/Product";
import { FC, useState } from "react";
import { showSwal } from "@/utils/helpers";
import { useRouter } from "next/navigation";

interface IProducts extends IProduct {
  _id: string;
}

interface DetailsProps {
  product: IProducts;
  userID: string;
}

const Details: FC<DetailsProps> = ({ product, userID }) => {
  const [isProductAddedToWishlist, setIsProductAddedToWishlist] =
    useState(false);

  const router = useRouter();

  const addProductToWishlist = async () => {
    const body = { user: userID, product: product._id };

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      setIsProductAddedToWishlist(true);
      showSwal(
        "محصول با موفقیت به لیست علاقه‌مندی‌های شما اضافه شد",
        "success",
        ["بستن", "متوجه شدم"]
      );
      router.replace("/wishlist");
    }
  };

  return (
    <main style={{ width: "63%" }}>
      <Breadcrumb title={product.name} />
      <h2>{product.name}</h2>

      <div className={styles.rating}>
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              color={index < product.score ? "gold" : "gray"}
            />
          ))}
        </div>
        <p>(دیدگاه {product.comments.length} کاربر)</p>
      </div>

      <p className={styles.price}>{product.price.toLocaleString()} تومان</p>
      <span className={styles.description}>{product.shortDescription}</span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart}>
        <button>افزودن به سبد خرید</button>
        <div>
          <span>-</span>1<span>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        {isProductAddedToWishlist ? (
          <div>
            <CiHeart fill="orange" />
            <span>محصول جزو علاقه‌مندی‌های شماست</span>
          </div>
        ) : (
          <div onClick={addProductToWishlist}>
            <CiHeart />
            <span>افزودن به علاقه مندی ها</span>
          </div>
        )}

        <div>
          <TbSwitch3 />
          <a href="/">مقایسه</a>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: {product._id}</strong>
        <p>
          {" "}
          <strong>دسته:</strong> Coffee Capsule, کپسول قهوه, همه موارد
        </p>
        <p>
          <strong>برچسب:</strong> {product.tags.join(" و")}
        </p>
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaPinterest />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaFacebookF />
        </a>
      </div>

      <hr />
    </main>
  );
};

export default Details;
