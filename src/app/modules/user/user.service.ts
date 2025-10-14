import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";

const createUser = async (payload: Partial<IUser>) => {
  const { email, ...rest } = payload;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const authProvider: IAuthProvider = {
    provider: "credential",
    providerId: email as string,
  };

  const user = await User.create({ email, ...rest, auths: [authProvider] });
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});
  const userCount = await User.countDocuments({});
  return { users, userCount };
};

export const userService = {
  createUser,
  getAllUsers,
};
