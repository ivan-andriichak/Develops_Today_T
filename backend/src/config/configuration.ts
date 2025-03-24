import { registerAs } from "@nestjs/config";

export interface AppConfig {
  apiUrl: string;
  apiKey: string;
  port: number;
}

export default registerAs("app", () => ({
  apiUrl: process.env.API_BASE_URL || "https://www.themealdb.com/api/json/v1/1",
  apiKey: process.env.API_KEY || "1",
  port: parseInt(process.env.PORT || "3000", 10),
}));
