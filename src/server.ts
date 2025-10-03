/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.dbUri);
    console.log("Connected to DB!!");

    server = app.listen(envVars.port, () => {
      console.log(`Server is running on port ${envVars.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... Server shutting down..");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received... Server shutting down..");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection detected... Server shutting down..", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("Unhandled Exception detected... Server shutting down..", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Unhandled rejection error
// Promise.reject(new Error("I forgot to catch this promise"));
// Uncaught Exception Error
// throw new Error("I forgot to handle this local error");

/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */
