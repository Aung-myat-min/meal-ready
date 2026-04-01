import jwt, { SignOptions } from "jsonwebtoken";
import { MJWTPayload } from "./util_types";

export default class JWTUtils {
  static sign(userId: string): string {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_TIME,
    } as SignOptions);

    return token;
  }

  static validate(token: string): MJWTPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as MJWTPayload;
    } catch (error) {
      console.error("Error: JWT verification failed: ", error);
      return null;
    }
  }
}
