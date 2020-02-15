import { Request, Response, NextFunction } from "express";
import mongoose, { CastError } from 'mongoose';
import colors from 'colors';

import { ErrorResponse } from '../helpers/errorResponse';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error: ErrorResponse;

  // Dev log
  console.log(colors.red(err.stack!));
  console.log(err.message);
  
  if(err.name === 'CastError') {
    // Mongoose bad ObjectId
    const castErr = err as CastError;
    const message = `Resource not found with id of ${castErr.value}`
    error = new ErrorResponse(message, 404);
  } else if(err.message.includes("E11000 duplicate key error collection")) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  } else if(err.name === 'ValidationError') {
    const valErr = err as mongoose.Error.ValidationError;
    const commaSeparatedErrorMsgs = Object.values(valErr.errors).map(er => er.message).join(',');
    error = new ErrorResponse(commaSeparatedErrorMsgs, 400);
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