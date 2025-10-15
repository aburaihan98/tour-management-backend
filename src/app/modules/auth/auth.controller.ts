import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthServices.credentialsLogin(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Login successful",
      data: user,
    });
  }
);

export const AuthController = {
  credentialsLogin,
};
