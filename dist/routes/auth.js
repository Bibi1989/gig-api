"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    try {
        const token = req.headers["auth"];
        if (!token) {
            throw Error("unauthorize user, access denied");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log("token not found");
        res.status(404).json({ error: error.message });
    }
};
exports.default = authenticate;
//# sourceMappingURL=auth.js.map