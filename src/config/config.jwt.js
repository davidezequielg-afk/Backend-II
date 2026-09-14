import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_EXPIRES_IN_MS = JWT_EXPIRES_IN * 1000; 
export const { NODE_ENV } = process.env;