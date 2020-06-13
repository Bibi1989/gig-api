import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { genSalt } from "bcrypt";
import { validateUser } from "../utils/validates";
const models = require("../../database/models/");
const { User, Gig } = models;

interface userInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  invalid?: string;
}

export const createUsers = async (user: userInterface) => {
  try {
    const errors: userInterface = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      invalid: "",
    };
    const { first_name, last_name, email, password } = user;
    if (!first_name) errors.first_name = "First Name field is empty";
    if (!last_name) errors.last_name = "Last Name field is empty";
    if (!email) errors.email = "Email field is empty";
    if (!password) errors.password = "Password field is empty";

    const findUser = await User.findOne({
      where: {
        email: user.email,
      },
    });
    if (findUser) errors.invalid = `User with this ${email} exist`;

    if (
      errors.first_name ||
      errors.last_name ||
      errors.email ||
      errors.password ||
      errors.invalid
    )
      return { status: "error", error: errors };
    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const users = await User.create({
      ...user,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        id: users.id,
        email: users.email,
        username: users.username,
      },
      process.env.SECRET_KEY
    );
    return { status: "success", data: users, token };
  } catch (error) {
    console.error(error);
    return { status: "error", error };
  }
};

export const loginUser = async (body: { email: string; password: string }) => {
  const errors = {
    email: "",
    password: "",
    invalid: "",
    invalidPassword: "",
  };
  try {
    const { email, password } = body;
    if (!email) errors.email = "Email field is empty";
    if (!password) errors.password = "Password field is empty";

    let user = await User.findOne({ where: { email } });

    if (!user) errors.invalid = `User with ${email} does not exist`;

    const validPassword = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (!validPassword) errors.invalidPassword = "Password is not valid!!!";

    if (
      errors.email ||
      errors.password ||
      errors.invalid ||
      errors.invalidPassword
    ) {
      return { status: "error", error: errors };
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.SECRET_KEY
    );
    return { status: "success", data: user, token };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const getUsers = async () => {
  try {
    const users = await User.findAll({
      include: [Gig],
    });
    return { status: "success", data: users };
  } catch (error) {
    return { status: "error", error };
  }
};
