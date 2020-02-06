import express, { Application, Request, Response, NextFunction, Router } from "express";
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse} from '../controllers/courses';

const router = express.Router();

router
  .route('/')
  .get(getCourses)
  .post(createCourse);

router.route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

export = router;