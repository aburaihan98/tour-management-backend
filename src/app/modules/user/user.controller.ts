/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    next(error);
  }
};

export const userController = {
  createUser,
};
