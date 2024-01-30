import {Subscription} from "rxjs";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({template: '', standalone: true})
export class MCFormComponent implements OnInit, OnDestroy {
  subscriptions?: Subscription[];

  form!: FormGroup;

  constructor() {
  }

  get emailErrors() {
    const control = this.form.get("email");
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError("required")) {
        return "Email is required";
      } else if (control.hasError("email")) {
        return "Email must be a valid email address";
      }
    }
    return '';
  }

  get passwordErrors() {
    const control = this.form.get("password");
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError("required")) {
        return 'This field is required';
      } else if (control.hasError("minlength")) {
        return 'Password should be at least 8 characters';
      }
    }
    return '';
  }

  get userNameErrors() {
    const control = this.form.get("username");
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError("required")) {
        return 'This field is required';
      } else if (control.hasError("minlength")) {
        return 'Username must be at least 4 characters';
      }
    }
    return '';
  }

  get titleErrors() {
    const control = this.form.get("title");
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError("required")) {
        return 'This field is required';
      }
    }
    return '';
  }

  get descriptionErrors() {
    const control = this.form.get("description");
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError("required")) {
        return 'This field is required';
      }
    }
    return '';
  }

  get bodyErrors() {
    const control = this.form.get("body");
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError("required")) {
        return 'This field is required';
      }
    }
    return '';
  }


  getRequiredErrors(name: string) {
    const control = this.form.get("name");
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError("required")) {
        return 'This field is required';
      }
    }
    return '';
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }
}
