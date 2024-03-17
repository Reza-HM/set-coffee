"use client";
import { showSwal } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

type AddToWishlistProps = {
  product: string;
  user: string;
};

async function AddToWishlist({ product, user }: AddToWishlistProps) {
  const router = useRouter();

  const addProductToWishlist = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!user) {
      return showSwal(
        "برای اضافه کردن به علاقه مندی‌ها لطفا ابتدا لاگین بکنین",
        "error",
        ["فهمیدم", "بستن"]
      );
    }

    const wish = {
      user,
      product,
    };

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wish),
    });

    console.log("Response ->", res);

    if (res.status === 201) {
      showSwal("محصول مورد نظر به علاقه‌مندی‌ها اضافه شد", "success", [
        "فهمیدم",
        "بستن",
      ]);
      router.push("/wishlist");
    }
  };

  return (
    <>
      <div onClick={addProductToWishlist}>
        <CiHeart />
        <span>افزودن به علاقه مندی ها</span>
      </div>
    </>
  );
}

export default AddToWishlist;
