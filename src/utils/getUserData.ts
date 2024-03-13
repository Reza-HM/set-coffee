import connectToDB from "@/configs/db";
import { cookies } from "next/headers";
import { IUser } from "../../models/User";
import { TokenData, verifyAccessToken } from "./auth";
import UserModel from "../../models/User";

const authUser = async (): Promise<IUser | null> => {
  connectToDB();
  const token = cookies().get("token");
  let user: IUser | null = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value) as TokenData | false;

    if (tokenPayload && tokenPayload.email) {
      user = await UserModel.findOne({ email: tokenPayload.email });
    }
  }

  return user;
};

export default authUser;
