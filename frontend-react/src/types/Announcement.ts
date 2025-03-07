import { Key } from "react";
import { Department } from "./Department";


export interface Announcement {
  id: string;
  userId: string;
  title: string;
  message: string;
  target: "college" | Department;
  timestamp: string;
  vulgarContent: boolean;
  likes: number;
  likedBy: string[];
}
