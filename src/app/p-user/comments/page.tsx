import DataTable from "@/components/templates/p-user/comments/DataTable";
import Layout from "@/components/layouts/UserPanelLayout";
import React from "react";
import connectToDB from "@/configs/db";
import Commentmodel from "../../../../models/Comment";
import authUser from "@/utils/getUserData";
import ProductModel from "../../../../models/Product";

const page = async () => {
  connectToDB();
  const user: any = await authUser();
  const comments = await Commentmodel.find(
    { username: user?.name },
    "-__v"
  ).populate({ path: "productID", model: ProductModel, select: "name" });
  console.log(user.comments);

  return (
    <Layout>
      <main>
        <DataTable
          comments={JSON.parse(JSON.stringify(comments))}
          title="لیست کامنت‌ها"
        />
        {/* <p className={styles.empty}>
          کامنتی وجود ندارد
        </p>  */}
      </main>
    </Layout>
  );
};

export default page;
