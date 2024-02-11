import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MCFormComponent} from '@app/classes/mc-form';
import {User} from '@shared/types/auth.types';
import {RouterLink} from '@angular/router';
import {Comment} from '@shared/types/main.types';
import {newSignal} from '@app/utils/signal-factory';
import {CommentsWorker} from '@app/workers/comments.worker';
import {ButtonSpinnerComponent} from '@shared/components/loaders/button-spinner.component';

@Component({
  selector: 'mc-comments-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonSpinnerComponent,
  ],
  templateUrl: './comments-form.component.html',
  styleUrls: [
    '../../../../shared/styles/forms.styles.scss',
    './comments-form.component.scss',
  ],
})
export class CommentsFormComponent extends MCFormComponent {
  @Input() user: User | undefined = undefined;
  @Input() slug: string = '';
  @Output() newComment = new EventEmitter<Comment>();
  commentSignal = newSignal<Comment>();
  commentWorker: CommentsWorker;

  constructor() {
    super();
    this.commentWorker = new CommentsWorker(this.commentSignal);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.setupForm();
  }

  setupForm() {
    this.form = new FormGroup({
      body: new FormControl('', [Validators.required]),
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      const body = {comment: this.form.value};

      this.commentWorker.postComment(this.slug, body, (comment) => {
        this.form.reset();
        this.newComment.emit(comment);
      });
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.commentWorker.dispose();
  }
}
