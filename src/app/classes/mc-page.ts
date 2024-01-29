import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {User} from "../shared/types/auth.types";
import {CurrentUserService} from "../shared/services/current-user.service";

@Component({standalone: true, template: ''})
export class McPage implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  store = inject(Store);
  currentUserService = inject(CurrentUserService);
  user?: User;

  ngOnInit() {
    const currentUserSubscription = this.currentUserService.user.subscribe({
      next: (user) => {
        user.data ? this.user = user.data : null;
      }
    })

    this.subscriptions.push(currentUserSubscription);
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 1) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }
}
