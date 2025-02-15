import { Request, Response, NextFunction } from "express";
import { AuthService } from "../utils/jwt";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Access token is missing or invalid." });
  }

  const decoded = AuthService.verifyToken(token);

  if (decoded) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).user = decoded;
    return next();
  }

  return res.status(401).json({ error: "Invalid or expired access token." });
};
