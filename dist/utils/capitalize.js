"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function capitalizeString(str) {
    const splitStr = str
        .split(" ")
        .map((s) => `${s[0].toUpperCase()}${s.slice(1)}` + " ")
        .join("");
    return splitStr;
}
exports.capitalizeString = capitalizeString;
//# sourceMappingURL=capitalize.js.map