import connectToDB from "@/configs/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  connectToDB();

  return Response.json({ message: "SUCCESS RESPONSE !!!!!" }, { status: 201 });
}
