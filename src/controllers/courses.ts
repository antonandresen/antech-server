import express, { Request, Response, NextFunction } from 'express';

import Course from '../models/Course';
import { asyncHandler } from '../middleware/async';
import { YoutubeApiHelper } from '../helpers/youtube';
import { ErrorResponse } from '../helpers/errorResponse';

// @desc   Get all courses
// @route  GET /api/v1/courses
// @access Public
export const getCourses = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  await YoutubeApiHelper.getCourses();
    const courses = await Course.find();
    res.status(200).json({ success: true, count: courses.length, data: courses});
});

// @desc   Get single courses
// @route  GET /api/v1/courses/:id
// @access Public
export const getCourse = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const course = await Course.findById(req.params.id);

    if (!course) return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));

    res.status(200).json({ success: true, data: course});
});

// @desc   Create new course
// @route  POST /api/v1/courses
// @access Private
export const createCourse = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const createdCourse = await Course.create(req.body);
    res.status(201).json({ success: true, data: createdCourse});
});

// @desc   Update course
// @route  PUT /api/v1/courses/:id
// @access Private
export const updateCourse = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    if(!course) return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));

    res.status(200).json({ success: true, data: course});
});

// @desc   Delete course
// @route  DELETE /api/v1/courses/:id
// @access Private
export const deleteCourse = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const course = await Course.findByIdAndDelete(req.params.id);
  
    if(!course) return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));

    res.status(200).json({ success: true, data: {}});
});

