"use client";
import React, { useState, ChangeEvent, FC } from "react";
import styles from "./tabs.module.css";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";
import { IProduct } from "../../../../models/Product";
interface IProducts extends IProduct {
  _id: string;
}

interface DetailsProps {
  product: IProducts;
}
const Tabs: FC<DetailsProps> = ({ product }) => {
  const [tab, setTab] = useState<string>("description");

  return (
    <div data-aos="fade-left" className={styles.tabs}>
      <ul>
        <li>
          <button
            className={tab === "description" ? styles.active_tab : ""}
            onClick={() => setTab("description")}
          >
            توضیحات
          </button>
        </li>
        <li>
          <button
            className={tab === "moreInfoes" ? styles.active_tab : ""}
            onClick={() => setTab("moreInfoes")}
          >
            اطلاعات بیشتر
          </button>
        </li>
        <li>
          <button
            className={tab === "comments" ? styles.active_tab : ""}
            onClick={() => setTab("comments")}
          >
            نظرات ({product.comments.length})
          </button>
        </li>
      </ul>

      <div className={styles.contents}>
        <section>
          {tab === "description" && <Description />}
          {tab == "moreInfoes" && <MoreInfoes />}
          {tab == "comments" && (
            <Comments
              productID={product._id}
              comments={JSON.parse(JSON.stringify(product.comments))}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Tabs;
