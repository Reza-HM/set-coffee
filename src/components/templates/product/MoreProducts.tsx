"use client";
import Product from "@/components/modules/product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FC } from "react";
import { IProduct } from "../../../../models/Product";

type MoreProductsProps = {
  relatedProducts: IProduct[];
};

const MoreProducts: FC<MoreProductsProps> = ({ relatedProducts }) => {
  return (
    <div data-aos="fade-right">
      <section>
        <h2>محصولات مرتبط</h2>
        <div
          style={{
            height: "2px",
            width: "70px",
            background: "black",
            marginTop: "10px",
          }}
        ></div>
      </section>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        dir="rtl"
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper "
      >
        {relatedProducts.map((product, index) => (
          <SwiperSlide>
            <Product {...product} key={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoreProducts;
