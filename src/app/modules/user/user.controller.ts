import { Request, Response } from "express";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ message: `Internal server error ${error.message}` });
  }
};

export const userController = {
  createUser,
};
