import connectToDB from "@/configs/db";
import ProductModel from "../../../../models/Product";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectToDB();
    const body = await req.json();
    const {
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
    } = body;

    const product = await ProductModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
    });

    return Response.json(
      { message: "Product created successfully :))", data: product },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {
  try {
    connectToDB();
    const products = await ProductModel.find({}, "-__v").populate("comments");
    return Response.json(products);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
