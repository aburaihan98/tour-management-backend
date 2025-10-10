import { User } from "./user.model";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.status(200).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const userController = {
  createUser,
};
