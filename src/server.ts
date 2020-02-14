import express, { Application, Request, Response, NextFunction, Router } from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
import { resolve } from "path";

import connectDB from './helpers/db';
import { startAccessToken } from './helpers/YTAccessToken';
import { errorHandler } from './middleware/error';

// Load env vars
dotenv.config({ path: resolve(__dirname, '../config/config.env')});

// Connect to database
connectDB();

// Fetch and keep access token updated
startAccessToken();

const app: Application = express();

// Body parser
app.use(express.json());

// Middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ test: "nice" });
});

// Mount routers
app.use('/api/v1/courses', require('./routes/courses') as Router);

app.use(errorHandler);

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
