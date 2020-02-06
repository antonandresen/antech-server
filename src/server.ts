import express, { Application, Request, Response, NextFunction, Router } from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
import { resolve } from "path";

import connectDB from './helpers/db';
import { EventEmitter } from "events";

// Load env vars
dotenv.config({ path: resolve(__dirname, '../config/config.env')});

// Connect to database
connectDB();

const app: Application = express();

// Middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());

// Mount routers
app.use('/api/v1/courses', require('./routes/courses') as Router);

app.get("/", (req: Request, res: Response) => {
  res.json({ test: "nice" });
});

const PORT = process.env.PORT || 1337;

const server = app.listen(PORT, () => console.log(
  colors.blue(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)));

// Handle unhandled promise rejections
process.once('unhandledRejection', (err, promise) => {
  if(err instanceof Error) {
    console.error(colors.red(`Error: ${err.name} - ${err.message}`));
    console.error(colors.red(`${err.stack}`));
    // Close server & exit process
    server.close(() => process.exit(1));
  }
});
