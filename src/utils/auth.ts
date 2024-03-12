import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import UserModel, { IUser } from "../../models/User";
import connectToDB from "@/configs/db";

interface TokenData {
  [key: string]: any;
}

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcryptjs.hash(password, 12);
  return hashedPassword;
};

const generateAccessToken = (data: TokenData): string => {
  const privateKey = process.env.AccessTokenPrivateKey || "";
  if (!privateKey) {
    throw new Error("Private key not provided");
  }

  const token = jwt.sign({ ...data }, privateKey, { expiresIn: "60d" });
  return token;
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  const isValid: boolean = await bcryptjs.compare(password, hashedPassword);
  return isValid;
};

const verifyAccessToken = (token: string): TokenData | false => {
  try {
    const privateKey = process.env.AccessTokenPrivateKey || "";
    if (!privateKey) {
      throw new Error("Private key not provided");
    }

    const validationResult = jwt.verify(token, privateKey);
    return validationResult as TokenData;
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      console.error("Token has expired");
    } else {
      console.error("Verify Token Error:", err);
    }
    return false;
  }
};

const generateRefreshToken = (data: TokenData): string => {
  const privateKey = process.env.RefreshTokenPrivateKey || "";
  if (!privateKey) {
    throw new Error("Private key not provided");
  }

  const token = jwt.sign({ ...data }, privateKey, { expiresIn: "15d" });
  return token;
};

const validateEmail = (email: string) => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return pattern.test(email);
};

const validatePhone = (phone: string) => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return pattern.test(phone);
};

const validatePassword = (password: string) => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  return pattern.test(password);
};

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

export {
  hashPassword,
  generateAccessToken,
  verifyPassword,
  verifyAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
  validatePassword,
  authUser,
};
