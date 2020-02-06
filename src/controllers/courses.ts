import express, { Request, Response, NextFunction } from 'express';

// @desc   Get all courses
// @route  GET /api/v1/courses
// @access Public
export const getCourses = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, msg: 'Show all courses'});
}

// @desc   Get single courses
// @route  GET /api/v1/courses/:id
// @access Public
export const getCourse = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, msg: 'Show one course'});
}

// @desc   Create new course
// @route  POST /api/v1/courses
// @access Private
export const createCourse = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, msg: 'Course created'});
}

// @desc   Update course
// @route  PUT /api/v1/courses/:id
// @access Private
export const updateCourse = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, msg: 'Course updated'});
}

// @desc   Delete course
// @route  DELETE /api/v1/courses/:id
// @access Private
export const deleteCourse = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, msg: 'Course deleted'});
}

