import mongoose, { Document } from 'mongoose';

import { ICourseVideo } from '../types/models';

type DBCourseVideo = ICourseVideo & Document;

const CourseVideoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Please add a url'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [60, 'Name can not be more than 60 characters']
  }
});

const CourseVideo = mongoose.model<DBCourseVideo>('CourseVideo', CourseVideoSchema);
export default CourseVideo;