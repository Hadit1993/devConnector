import User from "./User";

export default interface Profile {
  user: User;
  handle: string;
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills: string[];
  bio?: string;
  githubUsername?: string;
  experience: Experience[];
  education: Education[];
  social?: Social;
  date: Date;
}

export interface Experience {
  _id: string;
  title: string;
  company: string;
  location?: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
}

export interface Education {
  _id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
}

export interface Social {
  youtube?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
}
