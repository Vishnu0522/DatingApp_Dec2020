import { Photo } from "./photo";

export interface Member {
    id: number;
    username: string;
    age: number;
    dataOfBirth: Date;
    photoUrl?: any;
    knowAs?: any;
    created: Date;
    lastActive: Date;
    gender?: string;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    city?: string;
    country?: string;
    photos: Photo[];
  }
  
