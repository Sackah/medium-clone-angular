import {
   Component,
   Input,
   OnChanges,
   OnDestroy,
   OnInit,
   SimpleChanges,
} from '@angular/core';
import {newSignal} from '@app/utils/signal-factory';
import {CommentsWorker} from '@app/workers/comments.worker';
import {Comment} from '@app/shared/types/main.types';
import {McSpinnerComponent} from '@shared/components/loaders/mc-spinner.component';
import {RouterLink} from '@angular/router';
import {FormatDate} from '@/app/utils/format-date';

@Component({
   selector: 'mc-comments-list',
   standalone: true,
   imports: [McSpinnerComponent, RouterLink],
   templateUrl: './comments-list.component.html',
   styleUrl: './comments-list.component.scss',
})
export class CommentsListComponent implements OnInit, OnChanges, OnDestroy {
   @Input() newComment: Comment | undefined = undefined;
   @Input() slug: string = '';
   comments: Comment[] = [];
   commentSignal = newSignal<{comments: Comment[]}>();
   commentsWorker: CommentsWorker;
   FormatDate = FormatDate;

   constructor() {
      this.commentsWorker = new CommentsWorker(this.commentSignal);
   }

   ngOnInit() {
      this.fetchComments();
   }

   ngOnChanges(changes: SimpleChanges) {
      if (changes['newComment']) {
         if (this.newComment) {
            this.comments.unshift(this.newComment);
            this.comments = [...this.comments];
         }
      }
   }

   fetchComments() {
      this.commentsWorker.fetchComments(this.slug, (comments) => {
         this.comments = [...comments];
      });
   }

   deleteComment(id: number) {
      this.commentsWorker.deleteComment(this.slug, id, (id) => {
         const index = this.comments.findIndex((comment) => comment.id === id);
         this.comments.splice(index, 1);
      });
   }

   ngOnDestroy() {
      this.commentsWorker.dispose();
   }
}
