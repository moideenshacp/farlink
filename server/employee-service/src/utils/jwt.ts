import jwt, { JwtPayload } from "jsonwebtoken";
import { JwtPayloadInput } from "../interfaces/IjwtPayloadInput";


const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "your_secret_key"
const JWT_EXPIRATION = "1m";
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
      console.log("from util jwt ",decoded);
      
      return decoded as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.error("Token expired:", token);
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.error("Invalid token:", token);
      } else {
        console.error("Unknown error during token verification:", error);
      }
      return null;
    }
  }
  static verifyRefreshToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, REFRESH_SECRET);
      return decoded as JwtPayload;
    } catch (error) {
      console.log(error);
      
      return null;
    }
  }
  
}
