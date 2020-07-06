"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDoc = require("../swagger.json");
dotenv_1.default.config();
const app = express_1.default();
// imports
const gig_1 = __importDefault(require("./routes/gig"));
const users_1 = __importDefault(require("./routes/users"));
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static("public"));
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
// routes
app.use("/api/v1/gig", gig_1.default);
app.use("/auth/v1", users_1.default);
app.get("*", (req, res) => {
    res.sendFile("index.html");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    console.log(err);
    if (err) {
        return res.status(err.code).json({ status: "error", error: err.error });
    }
    // render the error page
    // res.status(err.status || 500);
    // res.json({ status: "error", error: err });
});
exports.default = app;
//# sourceMappingURL=app.js.map