import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../utils/jwt';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void>  => {

const token = req.cookies.accessToken;

  if (!token) {
    console.log("Access token is missing or invalid.");
     res.status(401).json({ error: 'Access token is missing or invalid.' });
    }
    
    const decoded = AuthService.verifyToken(token);
    if(!decoded){
    res.status(401).json({ error: 'Access token is missing or invalid.' });

  }
  
  if (decoded) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).user = decoded;
    return next();
  }

   res.status(401).json({ error: 'Invalid or expired access token.' });
};
