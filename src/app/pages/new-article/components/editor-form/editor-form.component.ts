import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MCFormComponent} from '@app/classes/mc-form';
import {BackendErrorsComponent} from '@shared/components/backend-errors/backend-errors.component';
import {ButtonSpinnerComponent} from '@shared/components/loaders/button-spinner.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {BackendErrors} from '@shared/types/auth.types';
import {NewArticleDetails} from '@shared/types/editor.types';
import {Article} from '@shared/types/main.types';

@Component({
  selector: 'mc-editor-form',
  standalone: true,
  imports: [
    BackendErrorsComponent,
    ButtonSpinnerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './editor-form.component.html',
  styleUrls: [
    '../../../../shared/styles/forms.styles.scss',
    './editor-form.component.scss',
  ],
})
export class EditorFormComponent extends MCFormComponent {
  @Input() errors: BackendErrors | null = null;
  @Input() isSubmitting: boolean = false;
  @Input() article: Article | null = null;
  @Output() newArticle = new EventEmitter<NewArticleDetails>();

  override ngOnInit() {
    super.ngOnInit();
    this.setupForm();
  }

  setupForm() {
    if (!this.article) {
      this.form = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        body: new FormControl('', [Validators.required]),
        tags: new FormControl(''),
      });
    } else {
      this.form = new FormGroup({
        title: new FormControl(
          {
            value: this.article.title,
            disabled: false,
          },
          [Validators.required]
        ),
        description: new FormControl(
          {
            value: this.article.description,
            disabled: false,
          },
          [Validators.required]
        ),
        body: new FormControl(
          {
            value: this.article.body,
            disabled: false,
          },
          [Validators.required]
        ),
        tags: new FormControl({
          value: this.article.tagList.join(', '),
          disabled: false,
        }),
      });
    }
  }

  handleSubmit() {
    const tagsString = this.form.get('tags')?.value;
    const tagsArray = tagsString.split(/\s+|,|;/).filter(Boolean);

    const formValues = {
      ...this.form.value,
      tagList: tagsArray,
    };

    if (this.form.valid) {
      this.newArticle.emit({article: formValues});
    }
  }
}
