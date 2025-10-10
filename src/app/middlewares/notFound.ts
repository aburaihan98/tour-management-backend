import { Request, Response } from "express";
import HttpStatus from "http-status-codes";

const notFound = (req: Request, res: Response) => {
  res.status(HttpStatus.NOT_FOUND).json({ message: "Route Not Found" });
};

export default notFound;
