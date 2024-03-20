import connectToDB from "@/configs/db";
import authUser from "@/utils/getUserData";
import { NextRequest } from "next/server";
import wishlistModel from "../../../../../models/Wishlist";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    connectToDB();
    const user = await authUser();
    if (!user?.name) {
      return Response.json({ message: "Please Login First!" }, { status: 401 });
    }
    const productID = params.id;

    await wishlistModel.findOneAndDelete({
      user: user._id,
      product: productID,
    });

    return Response.json({ message: "Product Removed Successfully!" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
