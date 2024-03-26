import connectToDB from "@/configs/db";
import UserModel from "../../../../models/User";
import authUser from "@/utils/getUserData";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectToDB();
    const user = await authUser();
    const body = await req.json();
    const { name, email, phone } = body;

    await UserModel.findOneAndUpdate(
      { _id: user?._id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    );

    return Response.json(
      { message: "User updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
