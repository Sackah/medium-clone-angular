import { Injectable } from '@angular/core';
import { MCService } from '@app/classes/mc-service';
import { catchError, map } from 'rxjs';
import { environment } from '@/environments/environment.development';
import { Comment } from '@shared/types/main.types';
import { NewComment } from '@shared/types/comment.types';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends MCService {

  constructor() {
    super();
  }


  post(comment: NewComment, slug: string) {
    return this.http
      .post<{
        comment: Comment;
      }>(
        `${environment.BaseUrl}/articles/${slug}/comments`,
        comment,
        this.headers
      )
      .pipe(
        map((res) => res.comment),
        catchError((err) => this.onError(err))
      );
  }

  getAll(slug: string) {
    return this.http
      .get<{ comments: Comment[] }>(
        `${environment.BaseUrl}/articles/${slug}/comments`,
        this.headers
      )
      .pipe(
        map((res) => res.comments),
        catchError((err) => this.onError(err))
      );
  }

  delete(slug: string, id: number) {
    return this.http
      .delete(
        `${environment.BaseUrl}/articles/${slug}/comments/${id}`,
        this.headers
      )
      .pipe(catchError((err) => this.onError(err)));
  }

}
