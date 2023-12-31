import { StringLiteral } from "typescript";

export interface ISitterPhoto {
  pk: string;
  file: string;
  description: string;
}

export interface ISitterList {
  pk: number;
  photos: ISitterPhoto[];
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_account: boolean;
  category: number;
  is_liked: boolean;
}

export interface ISitterAccount {
  name: string;
  username: string;
}

export interface ICategory {
  pk: number;
  category_name: string;
  category_kind: string;
}

export interface ISitterDetail extends ISitterList {
  id: number;
  created_at: string;
  updated_at: string;
  address: string;
  description: string;
  services: IService[];
  category: ICategory;
  account: ISitterAccount;
}

export interface IReview {
  user: IUser;
  rating: number;
  payload: string;
}

export interface IUser {
  pk: number;
  last_login: string;
  username: string;
  email: string;
  name: string;
  date_joined: string;
  avatar: string;
  is_sitter: boolean;
  pet_name: string;
  pet_gender: string;
  pet_age: number;
  pet_weight: number;
  pet_breed: string;
  neutering: boolean;
  pet_description: string;
}

export interface IService {
  pk: number;
  service_name: string;
  description: string;
}

export interface IUserBookingList {
  pk: number;
  sitter: ISitterDetail;
  check_in: string;
  check_out: string;
  pets: number;
  pet_name: string;
  pet_gender: string;
  pet_age: number;
  pet_weight: number;
  pet_breed: string;
  neutering: boolean;
  pet_description: string;
}

export interface ISitterBookingList {
  pk: number;
  check_in: string;
  check_out: string;
  pets: number;
  user: IUser;
}
