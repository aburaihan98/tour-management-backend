import express, { Request, Response } from "express";
import { userRoute } from "./app/modules/user/user.route";

const app = express();

app.use(express.json());
app.use("/api/v1/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Welcome to Tour Management System Backend" });
});

export default app;
