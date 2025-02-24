import { Request, Response } from "express";
import { IuserController } from "../interfaces/IuserController";
import { registerUserSchema } from "../validators/RegisterUserValidator";
import { CustomError } from "../errors/CustomError";
import { AuthService } from "../utils/jwt";
import { resetPasswordSchema } from "../validators/ResetPasswordValidation";
import IuserService from "interfaces/IuserService";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { MessageConstants } from "../constants/MessageConstants";

export class userController implements IuserController {
  private _userService: IuserService;

  constructor(_userService: IuserService) {
    this._userService = _userService;
  }

  public registerUser = async (req: Request, res: Response) => {
    try {
      const { error, value } = registerUserSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errorMessage = error.details.map((err) => err.message);
        res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errorMessage });
        return;
      }
      const { name, email, password } = value;

      await this._userService.registersUser(name, email, password);
      res.status(HttpStatusCode.CREATED).json({ message:MessageConstants.USER_REGISTERED  });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error });
      }
    }
  };

  public verifyEmail = async (req: Request, res: Response) => {
    try {
      const { token } = req.query;

      await this._userService.verifyEmail(token as string);
      res
        .status(HttpStatusCode.OK)
        .json({ status: "success", message: MessageConstants.EMAIL_VERIFIED });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };

  public loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ error: MessageConstants.BAD_REQUEST });
      }

      const user = await this._userService.loginUser(email, password);

      const token = AuthService.generateToken({
        email: user.email,
        role: user.role,
      });
      const refreshToken = AuthService.generateRefreshToken({
        email: user.email,
        role: user.role,
      });
      res.cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(HttpStatusCode.OK).json({
        message: MessageConstants.LOGIN_SUCCESS,
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
          token: token,
          image: user.image,
          isOrganizationAdded: user.isOrganizationAdded,
          organizationId: user.organizationId,
          position: user.position,
        },
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };

  public logoutUser = async (req: Request, res: Response) => {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "strict",
      });

      return res.status(HttpStatusCode.OK).json({ message: MessageConstants.LOGOUT_SUCCESS });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };

  public forgetPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: MessageConstants.BAD_REQUEST });
        return;
      }
      await this._userService.generatePasswordResetToken(email);
      res
        .status(HttpStatusCode.OK)
        .json({ message: MessageConstants.PASSWORD_RESET_LINK_SENT });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error });
      }
    }
  };
  public resetPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { error, value } = resetPasswordSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errorMessage = error.details.map((err) => err.message);
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errorMessage });
      }

      const { password, token } = value;

      await this._userService.resetPassword(password, token);
      return res.status(HttpStatusCode.CREATED).json({ message: MessageConstants.PASSWORD_UPDATED });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: error });
      }
    }
  };
  public refreshToken = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      const newAccessToken = await this._userService.refreshToken(refreshToken);
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      return res.status(HttpStatusCode.OK).json({
        message: MessageConstants.TOKEN_REFRESHED,
        accessToken: newAccessToken,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        return res.status(error.status).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: error });
      }
    }
  };

  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fName, lName, phone, email, image } = req.body;

      const user = await this._userService.updateProfile(
        fName,
        lName,
        phone,
        email,
        image
      );
      if (user) {
        res.status(HttpStatusCode.OK).json({
          message: MessageConstants.PROFILE_UPDATED,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
          },
        });
      }
    } catch (error) {
      console.log(error);

      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: MessageConstants.INTERNAL_SERVER_ERROR,
      });
    }
  };

  public getUserProfile = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { email } = req.query;

      if (!email) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
        return;
      }
      const userProfile = await this._userService.getUserProfile(
        email as string
      );
      if (!userProfile) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: MessageConstants.USER_NOT_FOUND });
        return;
      }
      res
        .status(HttpStatusCode.OK)
        .json({ message: MessageConstants.PROFILE_FETCHED, userProfile });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };

  public googleLogin = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { email, name, picture, sub } = req.body;

      if (!email || !sub) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: MessageConstants.BAD_REQUEST });
      }
      const user = await this._userService.googleLogin(
        email,
        name,
        sub,
        picture
      );

      if (user) {
        const token = AuthService.generateToken({
          email: user.email,
          role: user.role,
        });
        const refreshToken = AuthService.generateRefreshToken({
          email: user.email,
          role: user.role,
        });

        res.cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(HttpStatusCode.OK).json({
          message: MessageConstants.LOGIN_SUCCESS,
          user: {
            _id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            token: token,
            image: user.image,
            isOrganizationAdded: user.isOrganizationAdded,
            organizationId: user.organizationId,
          },
        });
      }
      return res.status(HttpStatusCode.NOT_FOUND).json({ error: MessageConstants.USER_NOT_FOUND });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };

  public fetchEmployeesId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { employeeIds } = req.query;
      const employees = await this._userService.fetchEmployeesId(
        employeeIds as string[]
      );
      res
        .status(HttpStatusCode.OK)
        .json({ message: MessageConstants.EMPLOYEES_FETCHED, employees });
    } catch (error) {
      console.log(error);
    }
  };
  public getAllEmployees = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { organizationId, page, pageSize } = req.query;
      if (!organizationId) {
        throw new Error("organix=zation id is needed");
      }
      const pageNumber = page ? parseInt(page as string, 10) : undefined;
      const pageSizeNumber = pageSize
        ? parseInt(pageSize as string, 10)
        : undefined;
      const { employees, totalEmployees } =
        await this._userService.getAllEmployees(
          organizationId as string,
          pageNumber,
          pageSizeNumber
        );
      res.status(HttpStatusCode.OK).json({ message: "sucess", employees, totalEmployees });
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message:MessageConstants.INTERNAL_SERVER_ERROR});
    }
  };
}
