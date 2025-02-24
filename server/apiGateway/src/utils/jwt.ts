import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export class AuthService {
  static verifyToken(token: string): JwtPayload | null {
    try {
      console.log("verifiyeing token",token);
      
      const decoded = jwt.verify(token, JWT_SECRET); 
            
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

  
}
