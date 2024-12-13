"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserMapper {
    static toEntity(dto) {
        return {
            name: dto.name,
            email: dto.email,
            password: bcryptjs_1.default.hashSync(dto.password, 10),
            role: dto.role,
            isActive: true,
            verified: false
        };
    }
}
exports.UserMapper = UserMapper;
