import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
const PORT = process.env.PORT || 5000;

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aburaihanrahmani:gDng3596DSYKVjpz@raihan.0p9bes0.mongodb.net/tour-management?retryWrites=true&w=majority&appName=Raihan"
    );
    console.log("Connected to DB!!");

    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
