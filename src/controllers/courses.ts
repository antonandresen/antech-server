import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { getAccessToken } from '../helpers/YTAccessToken';

// @desc   Get all courses
// @route  GET /api/v1/courses
// @access Public
export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = getAccessToken();
  const url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCj1wCzm_fzG_tUBh8-780ZQ&maxResults=50';
  const resp = await axios.get(`${url}&key=${process.env.GOOGLE_API_KEY}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const playlists = resp.data.items;
  
  const url2 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50';
  playlists.forEach(async (playlist: any) => {
    const resp2 = await axios.get(`${url2}&playlistId=${playlist.id}&key=${process.env.GOOGLE_API_KEY}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    resp2.data.items.forEach((item: any) => {
      console.log(item.snippet.title);
    });
  });
  
  
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

