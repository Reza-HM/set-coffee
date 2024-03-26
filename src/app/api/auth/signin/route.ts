import connectToDB from "@/configs/db";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  verifyPassword,
} from "@/utils/auth";
import { NextRequest } from "next/server";
import UserModel from "../../../../../models/User";

export async function POST(req: NextRequest) {
  try {
    connectToDB();

    const body = await req.json();
    const { email, password } = body;

    const isEmailValid = validateEmail(email);
    const isPasswordEmail = validatePassword(password);

    if (!isEmailValid || !isPasswordEmail) {
      return Response.json(
        { message: "email or password is invalid" },
        { status: 419 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        { message: "there is not such a user !" },
        { status: 422 }
      );
    }

    const isPasswordCorrectWithHash = verifyPassword(password, user.password);

    if (!isPasswordCorrectWithHash) {
      return Response.json(
        { message: "email or password in not correct !" },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          refreshToken,
        },
      }
    );

    return Response.json(
      { message: "user logged in successfully :))" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${accessToken};path=/;httpOnly=true;`,
        },
      }
    );
  } catch (err) {
    console.log("Err ->", err);
    return Response.json(
      { message: err },
      {
        status: 500,
      }
    );
  }
}
