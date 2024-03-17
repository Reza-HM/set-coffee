import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "../../../../../models/User";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne(
        { email: tokenPayload.email },
        "-password -refreshToken -__v"
      );
    }

    return Response.json(user);
  } else {
    return Response.json(
      {
        data: null,
        message: "No access !!",
      },
      { status: 401 }
    );
  }
}
