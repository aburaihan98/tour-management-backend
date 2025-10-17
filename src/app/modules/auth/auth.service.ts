import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const emailExists = await User.findOne({ email });
  if (!emailExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const isPasswordMatched = await bcrypt.compare(
    password as string,
    emailExists.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const userPayload = {
    id: emailExists._id,
    email: emailExists.email,
    role: emailExists.role,
  };

  const token = jwt.sign(userPayload, "your_jwt_secret_key", {
    expiresIn: "1d",
  });

  return {
    email: emailExists.email,
    token,
  };
};

export const AuthServices = {
  credentialsLogin,
};
