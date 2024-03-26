import connectToDB from "@/configs/db";
import UserModel from "../../../../../models/User";
import { isValidObjectId } from "mongoose";

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    connectToDB();
    const id = params.id;

    if (!isValidObjectId(id)) {
      return Response.json({ message: "id is not valid!" }, { status: 401 });
    }

    await UserModel.findOneAndDelete({ _id: id });
    return Response.json(
      { message: "User removed successfully :))" },
      { status: 200 }
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
