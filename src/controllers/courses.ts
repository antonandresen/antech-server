import express, { Request, Response, NextFunction } from 'express';

import Course from '../models/Course';
import { YoutubeApiHelper } from '../helpers/youtube';
import { ErrorResponse } from '../helpers/errorResponse';

// @desc   Get all courses
// @route  GET /api/v1/courses
// @access Public
export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  await YoutubeApiHelper.getCourses();
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, count: courses.length, data: courses});
  } catch (err) {
    next(err);
  } 
}

// @desc   Get single courses
// @route  GET /api/v1/courses/:id
// @access Public
export const getCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return next(new ErrorResponse(`Resource not found with that id`, 404));

    res.status(200).json({ success: true, data: course});
  } catch (err) {
    next(err);
  }
}

// @desc   Create new course
// @route  POST /api/v1/courses
// @access Private
export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdCourse = await Course.create(req.body);
    res.status(201).json({ success: true, data: createdCourse});
  } catch (err) {
    next(err);
  }
}

// @desc   Update course
// @route  PUT /api/v1/courses/:id
// @access Private
export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    if(!course) return next(new ErrorResponse(`Resource not found with that id`, 404));

    res.status(200).json({ success: true, data: course});
  } catch (err) {
    next(err);
  }
}

// @desc   Delete course
// @route  DELETE /api/v1/courses/:id
// @access Private
export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
  
    if(!course) return next(new ErrorResponse(`Resource not found with that id`, 404));

    res.status(200).json({ success: true, data: {}});
  } catch (err) {
    next(err);
  }
}

