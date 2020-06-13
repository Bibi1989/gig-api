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
const { User, Gig } = models;
exports.createUsers = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            invalid: "",
        };
        const { first_name, last_name, email, password } = user;
        if (!first_name)
            errors.first_name = "First Name field is empty";
        if (!last_name)
            errors.last_name = "Last Name field is empty";
        if (!email)
            errors.email = "Email field is empty";
        if (!password)
            errors.password = "Password field is empty";
        const findUser = yield User.findOne({
            where: {
                email: user.email,
            },
        });
        if (findUser)
            errors.invalid = `User with this ${email} exist`;
        if (errors.first_name ||
            errors.last_name ||
            errors.email ||
            errors.password ||
            errors.invalid)
            return { status: "error", error: errors };
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
        const errors = {
            email: "",
            password: "",
            invalid: "",
        };
        const { email, password } = body;
        if (!email)
            errors.email = "Email field is empty";
        if (!password)
            errors.password = "Password field is empty";
        let user = yield User.findOne({ where: { email } });
        if (!user)
            errors.invalid = `User with ${email} does not exist`;
        if (errors.email || errors.password || errors.invalid)
            return { status: "error", error: errors };
        const validPassword = yield bcryptjs_1.default.compare(password, user.dataValues.password);
        if (!validPassword)
            return { status: "invalid", error: "Password is not valid!!!" };
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
            include: [Gig],
        });
        return { status: "success", data: users };
    }
    catch (error) {
        return { status: "error", error };
    }
});
//# sourceMappingURL=user_controller.js.map