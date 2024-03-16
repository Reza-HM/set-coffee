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

  const handleTabChange: React.MouseEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTab(event.currentTarget.id);
  };

  return (
    <div data-aos="fade-left" className={styles.tabs}>
      <input
        onClick={handleTabChange}
        type="radio"
        id="description"
        name="tab-control"
        checked={tab === "description"}
      />
      <input
        onClick={handleTabChange}
        type="radio"
        id="moreInfoes"
        name="tab-control"
        checked={tab === "moreInfoes"}
      />
      <input
        onClick={handleTabChange}
        type="radio"
        id="comments"
        name="tab-control"
        checked={tab === "comments"}
      />
      <ul>
        <li title="Features">
          <label htmlFor="description" role="button">
            {" "}
            توضیحات{" "}
          </label>
        </li>
        <li title="Delivery Contents">
          <label htmlFor="moreInfoes" role="button">
            {" "}
            اطلاعات بیشتر{" "}
          </label>
        </li>
        <li title="Shipping">
          <label htmlFor="comments" role="button">
            {" "}
            نظرات ({product.comments.length}){" "}
          </label>
        </li>
      </ul>

      <div className={styles.contents}>
        <section className={styles.tabs_content}>
          {tab === "description" && <Description />}
        </section>
        <section className={styles.tabs_content}>
          {tab === "moreInfoes" && <MoreInfoes />}
        </section>
        <section className={styles.tabs_content}>
          {tab === "comments" && (
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
