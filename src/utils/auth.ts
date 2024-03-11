import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

interface TokenData {
  [key: string]: any;
}

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcryptjs.hash(password, 12);
  return hashedPassword;
};

const generateToken = (data: TokenData): string => {
  const privateKey = process.env.privateKey || "";
  if (!privateKey) {
    throw new Error("Private key not provided");
  }

  const token = jwt.sign({ ...data }, privateKey, { expiresIn: "24h" });
  return token;
};
const verifyPassword = async (password: string, hashedPassword: string) => {
  const isValid: boolean = await bcryptjs.compare(password, hashedPassword);
  return isValid;
};

const verifyToken = (token: string): TokenData | false => {
  try {
    const privateKey = process.env.privateKey || "";
    if (!privateKey) {
      throw new Error("Private key not provided");
    }

    const validationResult = jwt.verify(token, privateKey);
    return validationResult as TokenData;
  } catch (err) {
    console.error("Verify Token Error:", err);
    return false;
  }
};

export { hashPassword, generateToken, verifyPassword, verifyToken };
