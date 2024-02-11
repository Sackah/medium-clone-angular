import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MCFormComponent} from "@app/classes/mc-form";
import {User} from "@shared/types/auth.types";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'mc-comments-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './comments-form.component.html',
  styleUrls: ['../../../../shared/styles/forms.styles.scss', './comments-form.component.scss'],
})
export class CommentsFormComponent extends MCFormComponent {
  @Input() user: User | undefined = undefined;
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
