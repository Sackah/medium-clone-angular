import {BackendErrors} from "./auth.types";

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Article {
  slug: string,
  title: string,
  description: string,
  body: string,
  tagList: string[],
  createdAt: string,
  updatedAt: string,
  favorited: boolean,
  favoritesCount: number,
  author: Profile,
}

export interface InitialSig<T> {
  pending: boolean;
  error: BackendErrors | null;
  data: T | null;
}
