import Link from "next/link";
import styles from "./latest.module.css";
import { FaChevronLeft } from "react-icons/fa6";
import Product from "@/components/modules/product/Product";
import connectToDB from "@/configs/db";
import ProductModel from "../../../../../models/Product";
import CommentModel from "../../../../../models/Comment";

const Latest = async () => {
  connectToDB();

  const products = await ProductModel.find({});

  for (const product of products) {
    if (product.comments.length > 0) {
      await product.populate({
        path: "comments",
        model: CommentModel,
      });
    }
  }

  const allProducts = JSON.parse(JSON.stringify(products));

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <div>
          <p>آخرین محصولات</p>
          <span>Latest products</span>
        </div>
        <Link className={styles.link} href={"/category"}>
          مشاهده همه <FaChevronLeft />{" "}
        </Link>
      </section>
      <main data-aos="fade-up" className={styles.products}>
        {allProducts.map((product: any) => (
          <Product {...product} key={product._id} />
        ))}
      </main>
    </div>
  );
};

export default Latest;
