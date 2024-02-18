import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {User} from '@shared/types/auth.types';
import {CurrentUserService} from '@shared/services/current-user.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

@Component({standalone: true, template: ''})
export class MCPage implements OnInit, OnDestroy {
   protected subscriptions: Subscription[] = [];
   protected store = inject(Store);
   protected currentUserService = inject(CurrentUserService);
   protected user?: User;
   protected readonly titleService = inject(Title);
   readonly router = inject(Router);
   readonly route = inject(ActivatedRoute);

   constructor() {}

   setTitle(title: string) {
      this.titleService.setTitle(`${title} — Conduit`);
   }

   ngOnInit() {
      this.subscribeToCurrentUser();
   }

   private subscribeToCurrentUser() {
      const currentUserSubscription = this.currentUserService.user.subscribe({
         next: (user) => {
            user.data ? (this.user = user.data) : null;
         },
      });

      this.subscriptions.push(currentUserSubscription);
   }

   ngOnDestroy() {
      if (this.subscriptions.length > 1) {
         this.subscriptions.forEach((sub) => sub.unsubscribe());
      }
   }
}
