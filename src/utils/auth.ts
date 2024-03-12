import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

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

export {
  hashPassword,
  generateAccessToken,
  verifyPassword,
  verifyAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
  validatePassword,
};
