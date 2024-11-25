import jwt from 'jsonwebtoken';
import { User } from "../../core/entities/User";

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRATION = '1h';

export class AuthService {
  static generateToken(user: User): string {
    return jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  }

  static verifyToken(token: string): User | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded as User;
    } catch (error:any) {
      return null;
    }
  }
}
