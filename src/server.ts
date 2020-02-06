import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import { resolve } from "path";

// Load env vars
dotenv.config({ path: resolve(__dirname, '../config/config.env')});

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ test: "nice" });
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
