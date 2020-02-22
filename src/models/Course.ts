import mongoose, { Document } from 'mongoose';
import slugify from 'slugify';

import { ICourse } from '../types/models';
import CourseVideo from './CourseVideo';

type DBCourse = ICourse & Document;

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  url: {
    type: String,
    required: [true, 'Please add a url'],
    unique: true,
    trim: true,
  },
  CourseVideos: [CourseVideo],
  cost: {
    type: Number,
    required: [true, 'Please add a cost']
  },
  topics: {
    type: [String],
    required: [true, 'Please add topics']
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'rating can not be more than 10']
  },
  photo: {
    type: String,
    default: 'no-course-photo.png'
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create course slug from the name
CourseSchema.pre('save', function(next) {
  const document = this as DBCourse;
  document.slug = slugify(document.name, { lower: true });
  next();
});

const Course = mongoose.model<DBCourse>('Course', CourseSchema);
export default Course;