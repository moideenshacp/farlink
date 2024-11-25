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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const EmailService_1 = require("../../application/services/EmailService");
class RegisterUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findByEmail(dto.email);
            if (existingUser)
                throw new Error("User already exists");
            const user = {
                name: dto.name,
                email: dto.email,
                password: dto.password,
                role: dto.role,
                isActive: true,
                verified: false
            };
            const createdUser = yield this.userRepository.create(user);
            yield EmailService_1.EmailService.sendVerificationMail(user.email);
            return createdUser;
        });
    }
}
exports.RegisterUser = RegisterUser;
