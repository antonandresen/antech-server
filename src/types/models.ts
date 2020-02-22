export interface IUser {
  name: string;
  email: string;
  active: boolean;
};

export interface ICourse {
  name: string;
  url: string;
  cost: number;
  topics: [string];
  averageRating?: number; 
  photo: string;
  slug: string;
  createdAt: Date;
};

export interface ICourseVideo {
  url: string;
}