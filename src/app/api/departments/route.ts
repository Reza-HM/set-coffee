import connectToDB from "@/configs/db";
import DepartmentModel from "../../../../models/Department";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectToDB();
    const body = await req.json();
    const { title } = body;

    // Valid Title ✅

    await DepartmentModel.create({ title });

    return Response.json(
      { message: "Department created successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
