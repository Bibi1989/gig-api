import { GInterface, EInterface } from "./interfaces";

export const validate = (body: GInterface) => {
  const data: { errors: EInterface | null; body: GInterface | null } = {
    errors: null,
    body: null,
  };
  const errors: EInterface = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    stack: "",
    password: "",
    technologies: "",
  };
  const {
    first_name,
    last_name,
    email,
    phone,
    stack,
    password,
    technologies,
  } = body;

  if (!first_name) errors.first_name = "First name is empty";
  if (!last_name) errors.last_name = "Last name is empty";
  if (!email) errors.email = "Email is empty";
  if (!password) errors.password = "Password is empty";
  if (!technologies) errors.technologies = "Technologies is empty";
  if (!phone) errors.phone = "Phone is empty";
  if (!stack) errors.stack = "Stack is empty";

  if (
    errors.first_name ||
    errors.last_name ||
    errors.email ||
    errors.phone ||
    errors.stack ||
    errors.technologies ||
    errors.password
  ) {
    data.errors = errors;
  } else {
    data.body = body;
  }

  return data;
};
