import IuserRepo from "interfaces/IuserRepository";
import {
  CustomError,
  LoginUserError,
  LoginUserNotVerified,
  TokenError,
  userAlreadyverifed,
  userBlocked,
  UserExist,
  userNotFound,
} from "../errors/CustomError";
import IuserModel from "../interfaces/IuserModel";
import IuserService from "../interfaces/IuserService";
import { EmailService } from "../utils/emailVerify";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthService } from "../utils/jwt";

const EMAIL_SECRET = process.env.EMAIL_SECRET || "email_secret_key";

export class userService implements IuserService {
  private _userRepository: IuserRepo;

  constructor(_userRepository: IuserRepo) {
    this._userRepository = _userRepository;
  }

  async registersUser(
    name: string,
    email: string,
    password: string
  ): Promise<IuserModel> {
    const existingUser = await this._userRepository.findByEmail(email);
    if (existingUser?.verified) {
      throw new UserExist();
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser && !existingUser.verified) {
      const updatedUser = await this._userRepository.update(
        { email },
        { name, password: hashedPassword, isActive: true }
      );
      if (updatedUser) {
        await EmailService.sendVerificationMail(updatedUser.email);
      }
      return updatedUser!;
    }

    const newUser: Partial<IuserModel> = {
      name,
      email,
      password: hashedPassword,
      isActive: true,
      verified: false,
    };

    const createdUser = await this._userRepository.createUser(newUser);
    await EmailService.sendVerificationMail(email);
    return createdUser!;
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      // Decode the token to extract the email
      const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string };
      const user = await this._userRepository.findByEmail(email);

      if (!user) {
        throw new userNotFound();
      }

      if (user.verified) {
        throw new userAlreadyverifed();
      }

      await this._userRepository.update({ email }, { verified: true });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError"
      ) {
        throw new TokenError();
      }
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(500, "Internal Server Error");
    }
  }
  async refreshToken(refreshToken: string): Promise<string> {
    try {
      if (!refreshToken) {
        throw new CustomError(401, "Refresh token is required");
      }
      const decoded = AuthService.verifyRefreshToken(refreshToken);
      if (decoded) {
        const userExist = await this._userRepository.findByEmail(decoded.email);
        if (userExist && userExist.isActive === false) {
          throw new userBlocked();
        }
      }

      if (!decoded) {
        throw new CustomError(403, "Invalid or expired refresh token");
      }
      const newAccessToken = AuthService.generateToken({
        email: decoded.email,
        role: decoded.role,
      });
      return newAccessToken;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async loginUser(email: string, password: string): Promise<IuserModel> {
    const userExist = await this._userRepository.findByEmail(email);
    if (!userExist) {
      throw new LoginUserError();
    }
    if (userExist && userExist.verified === false) {
      throw new LoginUserNotVerified();
    }
    if (userExist && userExist.isActive === false) {
      throw new userBlocked();
    }
    const passwordMatch = bcrypt.compareSync(password, userExist.password);
    if (!passwordMatch) {
      throw new LoginUserError();
    }

    return userExist;
  }
  async generatePasswordResetToken(email: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      throw new userNotFound();
    }
    await EmailService.sendResetPasswordMail(email);
  }
  async resetPassword(password: string, token: string): Promise<IuserModel> {
    try {
      const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string };

      const findUser = await this._userRepository.findByEmail(email);

      if (!findUser) {
        throw new userNotFound();
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const updatePassword = await this._userRepository.update(
        { email },
        { password: hashedPassword }
      );
      return updatePassword as IuserModel;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError"
      ) {
        throw new TokenError();
      }
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(500, "Internal Server Error");
    }
  }
  async updateProfile(
    fName: string,
    lName: string,
    phone: string,
    email: string,
    image: string
  ): Promise<IuserModel | null> {
    try {
      if (!fName || fName.trim().length === 0) {
        throw new Error("First Name cannot be empty.");
      }
      if (!lName || lName.trim().length === 0) {
        throw new Error("Last Name cannot be empty.");
      }
      if (!phone || !/^\d{10}$/.test(phone)) {
        throw new Error("Phone number must be exactly 10 digits.");
      }
      const existingUser = await this._userRepository.findByEmail(email);

      if (!existingUser) {
        throw new Error("User not found.");
      }

      const updatedUser = await this._userRepository.update(
        { email },
        { firstName: fName, lastName: lName, phone: phone, image: image }
      );

      if (!updatedUser) {
        throw new Error("Failed to update the user.");
      }

      return updatedUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUserProfile(email: string): Promise<IuserModel | null> {
    try {
      const userProfile = await this._userRepository.findByEmail(email);
      if (!userProfile) {
        console.error(`User with email ${email} not found.`);
        return null;
      }
      return userProfile;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async googleLogin(
    email: string,
    name: string,
    googleId: string,
    image: string
  ): Promise<IuserModel> {
    const data = { email, name, googleId, image };

    let user = await this._userRepository.findByEmail(email);

    if (!user) {
      user = await this._userRepository.createUser(data);
    }
    if (user && user.isActive === false) {
      throw new userBlocked();
    }
    if (!user) {
      throw new Error("User creation failed");
    }

    return user;
  }
  async fetchEmployeesId(employeeId: string[]): Promise<IuserModel[] | null> {
    try {
      const employees =
        await this._userRepository.findEmployeesByIds(employeeId);
      if (employees) {
        return employees;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getAllEmployees(
    organizationId: string,
    page?: number,
    pageSize?: number
  ): Promise<{ employees: IuserModel[]; totalEmployees: number }> {
    try {
      // Count total employees
      const totalEmployees =
        await this._userRepository.countEmployeesByOrganization(organizationId);

      // Fetch employees with optional pagination
      const employees = await this._userRepository.findByOrganizationId(
        organizationId,
        page,
        pageSize
      );

      return { employees, totalEmployees };
    } catch (error) {
      console.error("Error in fetching employees:", error);
      throw error;
    }
  }
}
