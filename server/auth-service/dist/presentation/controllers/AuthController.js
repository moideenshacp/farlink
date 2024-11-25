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
const RegisterUser_1 = require("../../core/use-cases/RegisterUser");
const MongoUserRepository_1 = require("../../infrastructure/repositories/MongoUserRepository");
const UserMapper_1 = require("../../application/mappers/UserMapper");
const AuthService_1 = require("../../application/services/AuthService");
const Verify_Email_1 = require("../../core/use-cases/Verify-Email");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepo = new MongoUserRepository_1.MongoUserRepository();
        const useCase = new RegisterUser_1.RegisterUser(userRepo);
        const userDto = req.body;
        const userEntity = UserMapper_1.UserMapper.toEntity(userDto);
        const user = yield useCase.execute(userEntity);
        const token = AuthService_1.AuthService.generateToken(user);
        res.status(201).json({ message: "User registered successfully", token });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        const userRepo = new MongoUserRepository_1.MongoUserRepository();
        const useCase = new Verify_Email_1.VerifyEmail(userRepo);
        yield useCase.execute(token);
        res.status(200).json({ message: "Email verified successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.default = { registerUser, verifyEmail };
