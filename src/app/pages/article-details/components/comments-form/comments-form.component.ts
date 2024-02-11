import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MCFormComponent} from "@app/classes/mc-form";

@Component({
  selector: 'mc-comments-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './comments-form.component.html',
  styleUrls: ['../../../../shared/styles/forms.styles.scss', './comments-form.component.scss'],
})
export class CommentsFormComponent extends MCFormComponent {
  @Output() comment = new EventEmitter<{ comment: string }>()

  override ngOnInit() {
    super.ngOnInit();
    this.setupForm();
  }

  setupForm() {
    this.form = new FormGroup({
      body: new FormControl('', [Validators.required])
    })
  }

  handleSubmit() {
    if (this.form.valid) {
      this.comment.emit({comment: this.form.value})
    }
  }
}
