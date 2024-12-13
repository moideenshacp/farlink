import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";

const EMAIL_SECRET = process.env.EMAIL_SECRET || "email_secret_key";

const EMAIL_EXPIRATION = "50m";

export class EmailService {
  static async sendVerificationMail(email: string): Promise<void> {
    const verificationToken = jwt.sign({ email }, EMAIL_SECRET, {
      expiresIn: EMAIL_EXPIRATION,
    });

    const verificationLink = `${process.env.FRONT_URL}/verify-email?token=${verificationToken}`;

    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Farlink" <no-reply@example.com>',
      to: email,
      subject: "Verify your Email",
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">  
    <div style="text-align: center;">  
      <img src="https://imgur.com/4Typ3eP.png" alt="Your Company Logo" style="max-width: 200px; height: auto; margin-bottom: 20px;" />  
    </div>  
    <h2 style="text-align: center;">Please verify your email address to activate your account!</h2>  
    <p style="text-align: center;">Thanks for signing up with us!</p>  
    <p style="text-align: center;">Please click the button below to verify your email address and activate your account.</p>  
    <div style="text-align: center; margin: 20px;">  
      <a href="${verificationLink}" style="display: inline-block; padding: 15px 30px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Email Address</a>  
    </div>  
    <p style="text-align: center; font-size: 12px; color: #555;">Please note this link will expire within 24 hours.</p>  
  </div>
          `,
    });
  }
  static async sendResetPasswordMail(email: string): Promise<void> {
    const resetToken = jwt.sign({ email }, EMAIL_SECRET, {
      expiresIn: EMAIL_EXPIRATION,
    });
    const resetLink = `${process.env.FRONT_URL}/reset-password?token=${resetToken}`;

    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Farlink" <no-reply@example.com>',
      to: email,
      subject: "Reset Your Password",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
    <div style="text-align: center;">  
      <img src="https://imgur.com/4Typ3eP.png" alt="Your Company Logo" style="max-width: 200px; height: auto; margin-bottom: 10px;" />  
    </div>  
      <h2 style="text-align: center;">Reset Your Password</h2>
      <p style="text-align: center;">We received a request to reset your password.</p>
      <p style="text-align: center;">Click the button below to reset your password.</p>
      <div style="text-align: center; margin: 20px;">
        <a href="${resetLink}" style="display: inline-block; padding: 15px 30px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
      </div>
      <p style="text-align: center; font-size: 12px; color: #555;">If you did not request a password reset, you can ignore this email.</p>
    </div>
      `,
    });
  }
}
