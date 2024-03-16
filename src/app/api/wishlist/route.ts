import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import { NextRequest } from "next/server";
import wishlistModel from "../../../../models/Wishlist";

export async function POST(req: NextRequest) {
  try {
    connectToDB();

    const body = await req.json();
    const { user, product } = body;

    if (isValidObjectId(user) && isValidObjectId(product)) {
    } else {
      return Response.json(
        { message: "either user's id or product's id is not valid!" },
        { status: 422 }
      );
    }

    await wishlistModel.create({ user, product });

    return Response.json(
      { message: "Product added to the wishlist SUCCESSFULLY!" },
      { status: 201 }
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
