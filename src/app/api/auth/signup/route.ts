import connectToDB from "@/configs/db";
import { NextRequest } from "next/server";
import UserModel from "../../../../../models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { roles } from "@/utils/constants";

export async function POST(req: NextRequest) {
  connectToDB();

  const body = await req.json();
  const { name, phone, email, password } = body;

  // Validation

  const doesUserExist = await UserModel.findOne({
    $or: [{ name }, { email }, { phone }],
  });

  if (doesUserExist) {
    return Response.json(
      { message: "the username or email already exists" },
      { status: 422 }
    );
  }

  const hashedPassword = await hashPassword(password);
  const accessToken = generateAccessToken({ name });

  const users = await UserModel.find({});

  await UserModel.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: users.length > 0 ? roles.USER : roles.ADMIN,
  });

  return Response.json(
    { message: "SUCCESS RESPONSE !!!!!" },
    {
      status: 201,
      headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
    }
  );
}
