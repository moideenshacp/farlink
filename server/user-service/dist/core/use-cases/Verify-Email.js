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
exports.VerifyEmail = void 0;
// src/core/use-cases/VerifyEmail.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EMAIL_SECRET = process.env.EMAIL_SECRET || "email_secret_key";
class VerifyEmail {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = jsonwebtoken_1.default.verify(token, EMAIL_SECRET);
                const user = yield this.userRepository.findByEmail(email);
                console.log('verify email:', user);
                if (!user)
                    throw new Error("User not found");
                if (user.verified)
                    throw new Error("User is already verified");
                user.verified = true;
                yield this.userRepository.create(user);
            }
            catch (error) {
                throw new Error("Invalid or expired token");
            }
        });
    }
}
exports.VerifyEmail = VerifyEmail;
