import {Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormValidator} from '@app/utils/form-validator';

@Component({template: '', standalone: true})
export class MCFormComponent implements OnInit, OnDestroy {
   protected readonly subscriptions: Subscription[] = [];

   protected form!: FormGroup;

   protected formValidator!: FormValidator;

   constructor() {}

   ngOnInit() {
      this.formValidator = new FormValidator(this.form);
   }

   ngOnDestroy() {
      if (this.subscriptions.length > 0) {
         this.subscriptions.forEach((sub) => sub.unsubscribe());
      }
   }

   protected preventLeadingSpace(event: KeyboardEvent): void {
      if (
         event.key === ' ' &&
         (event.target as HTMLInputElement).selectionStart === 0
      ) {
         event.preventDefault();
      }
   }
}
