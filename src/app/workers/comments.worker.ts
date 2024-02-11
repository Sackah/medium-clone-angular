import {WritableSignal, inject} from '@angular/core';
import {CommentService} from '../pages/article-details/services/comment.service';
import {Subscription} from 'rxjs';
import {completeSignal, errorSignal, pendSignal} from '../utils/signal-factory';
import {Comment} from '../shared/types/main.types';
import {NewComment} from '../shared/types/comment.types';

export class CommentsWorker {
  private readonly signal;
  private readonly commentsService = inject(CommentService);
  private readonly subscriptions: Subscription[] = [];

  constructor(signal: WritableSignal<any>) {
    this.signal = signal;
  }

  fetchComments(slug: string, callback?: (comments: Comment[]) => void) {
    pendSignal(this.signal);
    this.commentsService.getAll(slug).subscribe({
      next: (comments) => {
        completeSignal(this.signal, comments);
        if (callback) {
          callback(comments);
        }
      },
      error: (err) => {
        errorSignal(this.signal, err);
      },
    });
  }

  postComment(
    slug: string,
    body: NewComment,
    callback?: (comment: Comment) => void
  ) {
    pendSignal(this.signal);
    this.commentsService.post(body, slug).subscribe({
      next: (comment) => {
        completeSignal(this.signal, comment);
        if (callback) {
          callback(comment);
        }
      },
      error: (err) => {
        errorSignal(this.signal, err);
      },
    });
  }

  deleteComment(slug: string, id: number, callback?: (id: number) => void) {
    pendSignal(this.signal);
    this.commentsService.delete(slug, id).subscribe({
      next: () => {
        completeSignal(this.signal, {});
        if (callback) {
          callback(id);
        }
      },
      error: (err) => {
        errorSignal(this.signal, err);
      },
    });
  }

  public dispose() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
