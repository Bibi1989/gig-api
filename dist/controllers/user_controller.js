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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const bcrypt_1 = require("bcrypt");
const models = require("../../database/models/");
const { User, Url } = models;
exports.createUsers = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.username)
        return { status: "error", error: "User field is empty" };
    if (!user.email)
        return { status: "error", error: "Email field is empty" };
    if (!user.password)
        return { status: "error", error: "Password field is empty" };
    const findUser = yield User.findOne({
        where: {
            email: user.email,
        },
    });
    //   console.log();
    try {
        if (findUser) {
            return { status: "error", error: "User with this email exist" };
        }
        const salt = yield bcrypt_1.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(user.password, salt);
        const users = yield User.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
        const token = jsonwebtoken_1.default.sign({
            id: users.id,
            email: users.email,
            username: users.username,
        }, process.env.SECRET_KEY);
        return { status: "success", data: users, token };
    }
    catch (error) {
        console.error(error);
        return { status: "error", error };
    }
});
exports.loginUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = body;
        if (!email)
            return { status: "error", error: "Email field is empty" };
        if (!password)
            return { status: "error", error: "Password field is empty" };
        let user = yield User.findOne({ where: { email } });
        if (!user.dataValues.email)
            return { status: "error", error: `User with ${email} does not exist` };
        const validPassword = yield bcryptjs_1.default.compare(password, user.dataValues.password);
        if (!validPassword)
            return { status: "error", error: "Password is not valid!!!" };
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            username: user.username,
        }, process.env.SECRET_KEY);
        return { status: "success", data: user, token };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.findAll({
            include: [Url],
        });
        return { status: "success", data: users };
    }
    catch (error) {
        return { status: "error", error };
    }
});
//# sourceMappingURL=user_controller.js.map