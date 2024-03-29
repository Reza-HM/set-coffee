import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";

import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import authUser from "@/utils/getUserData";
import connectToDB from "@/configs/db";
import ProductModel from "../../../../models/Product";
import CommentModel from "../../../../models/Comment";

const product = async ({ params }: { params: { id: string } }) => {
  const user = await authUser();
  connectToDB();
  const productID = params.id;
  const product = await ProductModel.findOne({ _id: productID });

  if (product.comments.length > 0) {
    await product.populate({
      path: "comments",
      model: CommentModel,
    });
  }
  const relatedProducts = await ProductModel.find({ smell: product.smell });

  return (
    <div className={styles.container}>
      <Navbar username={user?.name} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details
            product={JSON.parse(JSON.stringify(product))}
            userID={String(user?._id)}
          />
          <Gallery />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} />
        <MoreProducts
          relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
        />
      </div>
      <Footer />
    </div>
  );
};

export default product;
