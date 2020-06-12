"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = (body) => {
    const data = {
        errors: null,
        body: null,
    };
    const errors = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        stack: "",
        technologies: "",
    };
    const { first_name, last_name, email, phone, stack, technologies } = body;
    if (!first_name)
        errors.first_name = "First name is empty";
    if (!last_name)
        errors.last_name = "Last name is empty";
    if (!email)
        errors.email = "Email is empty";
    if (!technologies)
        errors.technologies = "Technologies is empty";
    if (!phone)
        errors.phone = "Phone is empty";
    if (!stack)
        errors.stack = "Stack is empty";
    if (errors.first_name ||
        errors.last_name ||
        errors.email ||
        errors.phone ||
        errors.stack ||
        errors.technologies) {
        data.errors = errors;
    }
    else {
        data.body = body;
    }
    return data;
};
exports.validateUser = (body) => {
    const data = {
        errors: null,
        body: null,
    };
    const errors = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    };
    const { first_name, last_name, email, password } = body;
    if (!first_name)
        return { status: "error", error: "User field is empty" };
    if (!last_name)
        return { status: "error", error: "User field is empty" };
    if (!email)
        return { status: "error", error: "Email field is empty" };
    if (!password)
        return { status: "error", error: "Password field is empty" };
    if (errors.first_name ||
        errors.last_name ||
        errors.email ||
        errors.password) {
        data.errors = errors;
    }
    else {
        data.body = body;
    }
    return data;
};
//# sourceMappingURL=validates.js.map