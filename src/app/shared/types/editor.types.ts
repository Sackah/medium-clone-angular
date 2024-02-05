import {BackendErrors} from "./auth.types";
import {Article} from "./main.types";

export interface NewArticleDetails {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }
}

export interface EditArticleDetails {
  article: {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[]
  }
}

export interface NewArticleResponse {
  article: Article;
}

export interface NewArticleState {
  isSubmitting: boolean;
  errors: BackendErrors | null;
  article: Article | null;
}
