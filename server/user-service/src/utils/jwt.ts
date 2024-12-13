import jwt, { JwtPayload } from "jsonwebtoken";
import IuserModel from "../interfaces/IuserModel";
import { JwtPayloadInput } from "../interfaces/JwtPayloadInput";


const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "your_secret_key"
const JWT_EXPIRATION = "1h";
const REFRESH_EXPIRATION = "7d"

export class AuthService {
  static generateToken(user: JwtPayloadInput): string {
    return jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
  }

  static generateRefreshToken(user: JwtPayloadInput): string {
    return jwt.sign({ email: user.email, role: user.role }, REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRATION,
    });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded as JwtPayload;
    } catch (error: any) {
      return null;
    }
  }
  static verifyRefreshToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, REFRESH_SECRET);
      return decoded as JwtPayload;
    } catch (error: any) {
      return null;
    }
  }
  
}
