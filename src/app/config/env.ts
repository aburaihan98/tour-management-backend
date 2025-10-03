import dotenv from "dotenv";
dotenv.config();

interface envConfig {
  port: string;
  dbUri: string;
  nodeEnv: "development" | "production";
}

const loadEnvVars = (): envConfig => {
  const requiredVars: string[] = ["PORT", "DB_URI", "NODE_ENV"];

  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Environment variable ${varName} is not set`);
    }
  });

  return {
    port: process.env.PORT as string,
    dbUri: process.env.DB_URI as string,
    nodeEnv: process.env.NODE_ENV as "development" | "production",
  };
};

export const envVars = loadEnvVars();
