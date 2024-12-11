import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../utils/jwt';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.cookies.accessToken;
//   const refreshToken = req.cookies.refreshToken;

//   if (!token) {
//     console.log("access tokeen missing anutoo==========================================");
    
//     return res.status(401).json({ error: 'Access token is missing or invalid.' });
//   }

//   // Step 1: Try to verify the access token
//   const decoded = AuthService.verifyToken(token);
  
//   if (decoded) {
//     // If the access token is valid, attach the user info to the request and proceed
//     (req as any).user = decoded;  // You can also include role, email, etc. depending on your needs
//     console.log("1==================================================");
    
//     return next();
//   }
//   console.log("2-------------------------------");
  

//   // Step 2: If the access token is expired, try refreshing it using the refresh token
//   if (!refreshToken) {
//     console.log("refresh token missing anutoooo==================================");
    
//     return res.status(401).json({ error: 'Refresh token is missing or invalid.' });
//   }

//   // Step 3: Verify the refresh token
//   const refreshDecoded = AuthService.verifyRefreshToken(refreshToken);
//   if (!refreshDecoded) {
//     console.log("refreshh token invalid anutoo================================");
    
//     return res.status(401).json({ error: 'Invalid refresh token.' });
//   }

//   // Step 4: If refresh token is valid, generate a new access token
//   console.log("3----------------------------------------------------------");
  
//   const newAccessToken = AuthService.generateToken({
//     email: refreshDecoded.email,
//     role: refreshDecoded.role
//   });

//   // Step 5: Set the new access token in the cookie
//   res.cookie('accessToken', newAccessToken, {
//     httpOnly: true,
//     sameSite: 'strict',
//     maxAge: 60 * 60 * 1000, // 1 hour
//   });

//   // Attach the decoded user information to the request and proceed
//   (req as any).user = decoded;
//   return next();

const token = req.cookies.accessToken;

  if (!token) {
    console.log("Access token is missing or invalid.");
    return res.status(401).json({ error: 'Access token is missing or invalid.' });
  }

  const decoded = AuthService.verifyToken(token);
  
  if (decoded) {
    (req as any).user = decoded;
    return next();
  }

  return res.status(401).json({ error: 'Invalid or expired access token.' });
};
