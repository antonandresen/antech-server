import { Request, Response, NextFunction } from "express";
import colors from 'colors';

import { ErrorResponse } from '../helpers/errorResponse';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error: ErrorResponse;

  // Dev log
  console.log(colors.red(err.stack!));

  // Mongoose bad ObjectId
  if(err.name === 'CastError') {
    const message = `Resource not found with that id`
    error = new ErrorResponse(message, 404);
  } else {
    if(err instanceof ErrorResponse) {
      error = new ErrorResponse(err.message, err.statusCode);
    } else {
      error = new ErrorResponse('Server Error', 500);
    }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
}