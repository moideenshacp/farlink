"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EMAIL_SECRET = process.env.EMAIL_SECRET || "email_secret_key";
const EMAIL_EXPIRATION = "1d";
class EmailService {
    static sendVerificationMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificationToken = jsonwebtoken_1.default.sign({ email }, EMAIL_SECRET, { expiresIn: EMAIL_EXPIRATION });
            const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email?token=${verificationToken}`;
            const transporter = nodemailer_1.default.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            yield transporter.sendMail({
                from: '"Auth Service" <no-reply@example.com>',
                to: email,
                subject: "Verify your Email",
                html: `
            <h1>Verify Your Email</h1>
            <p>Please click the link below to verify your email address:</p>
            <a href="${verificationLink}">${verificationLink}</a>
          `,
            });
        });
    }
}
exports.EmailService = EmailService;
