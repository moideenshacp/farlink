import jwt from 'jsonwebtoken';
import IuserModel from '../interfaces/IuserModel';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRATION = '1h';

export class AuthService {
  static generateToken(user: IuserModel): string {
    return jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  }

  static verifyToken(token: string): IuserModel | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("decoded******************",decoded);
      return decoded as IuserModel;
      
    } catch (error:any) {
      return null;
    }
  }
}
