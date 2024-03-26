import connectToDB from "@/configs/db";
import UserModel from "../../../../../models/User";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;

    const user = await UserModel.findOne({ _id: id }).lean();
    await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          role: user?.role === "USER" ? "ADMIN" : "USER",
        },
      }
    );

    return Response.json({ message: "User role updated successfully" });
  } catch (err) {
    return Response.json(
      { message: err },
      {
        status: 500,
      }
    );
  }
}
