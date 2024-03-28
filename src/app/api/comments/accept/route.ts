import connectToDB from "@/configs/db";
import CommentModel from "../../../../../models/Comment";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;

    await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: true,
        },
      }
    );
    return Response.json({ message: "Comment accepted successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
