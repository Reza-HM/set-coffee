"use client";
import { showSwal } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";

type AddToWishlistProps = {
  product: string;
  user: string;
};

async function AddToWishlist({ product, user }: AddToWishlistProps) {
  const [isProductAddedToWishlist, setIsProductAddedToWishlist] =
    useState(false);
  const router = useRouter();

  const addProductToWishlist = async () => {
    const body = { user, product };

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
    <>
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
    </>
  );
}

export default AddToWishlist;
