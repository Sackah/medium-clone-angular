import {BackendErrors} from "./auth.types";
import {Article} from "./main.types";

const weirdTimeFormat = "2016-02-18T03:22:56.637Z";

export interface NewArticleDetails {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
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
