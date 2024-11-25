"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const AuthRoutes_1 = __importDefault(require("./presentation/routes/AuthRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/api/auth", AuthRoutes_1.default);
const PORT = process.env.PORT || 5000;
mongoose_1.default
    .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farlink-auth-service')
    .then(() => {
    console.log("MongoDB connected...");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch;
