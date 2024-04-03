import {FormGroup} from '@angular/forms';

export class FormValidator {
   private field: string = '';

   constructor(private form: FormGroup) {}

   private get _errors() {
      const control = this.form.get(this.field);
      if (control?.invalid && (control.dirty || control.touched)) {
         if (control.hasError('required')) {
            return 'This field is required';
         } else if (control.hasError('minlength')) {
            return `${this.field.replace(/^\w/, (c) =>
               c.toUpperCase()
            )} must be at least ${
               this.field === 'username' ? '4' : '8'
            } characters long`;
         } else if (control.hasError('email')) {
            return 'Email must be a valid email address';
         }
      }

      return '';
   }

   public errors(field: string) {
      this.field = field;
      return this._errors;
   }
}
