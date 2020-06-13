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
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
const router = express_1.Router();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = yield user_controller_1.createUsers(body);
    if (user.status === "error") {
        res.status(400).json(user);
        return;
    }
    res.header("auth", user.token);
    res.json(user);
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = yield user_controller_1.loginUser(body);
    if (user.status === "error") {
        res.status(400).json(user);
        return;
    }
    if (user.status === "invalid") {
        res.status(404).json(user);
        return;
    }
    res.header("auth", user.token);
    res.json(user);
}));
router.get("/users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_controller_1.getUsers();
    res.json(users);
}));
exports.default = router;
//# sourceMappingURL=users.js.map