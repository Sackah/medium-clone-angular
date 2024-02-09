import { HttpClient } from '@angular/common/http';
import { WritableSignal, inject } from '@angular/core';
import { FollowProfileService } from '../shared/services/follow-profile.service';
import { Subscription, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  completeSignal,
  errorSignal,
  pendSignal,
} from '../utils/signal-factory';
import { Article, Profile } from '../shared/types/main.types';
import { CurrentUserService } from '../shared/services/current-user.service';

export class FollowProfileWorker {
  readonly http = inject(HttpClient);
  private followProfileService = inject(FollowProfileService);
  private subscriptions: Subscription[] = [];
  private readonly profileSignal;
  private readonly updaterFn;
  private currentUserService = inject(CurrentUserService);
  private router = inject(Router);

  constructor(
    profileSignal?: WritableSignal<any>,
    updaterFn?: (profile: Profile) => void
  ) {
    this.profileSignal = profileSignal;
    this.updaterFn = updaterFn;
  }

  follow(username: string, isFollowing: boolean) {
    this.profileSignal ? pendSignal(this.profileSignal) : null;

    if (isFollowing) {
      this.unfollow(username);
      return;
    }

    const continueExecution = () => {
      const sub = this.followProfileService.follow(username).subscribe({
        next: (profile) => {
          this.profileSignal
            ? completeSignal(this.profileSignal, profile)
            : null;
          this.updaterFn ? this.updaterFn(profile) : null;
        },
        error: (err) => {
          this.profileSignal ? errorSignal(this.profileSignal, err) : null;
        },
      });

      this.subscriptions.push(sub);
    };

    this.currentUserService.user
      .pipe(
        take(1),
        tap((user) => {
          if (!user.data) {
            this.router.navigateByUrl('/login');
          } else {
            continueExecution();
          }
        })
      )
      .subscribe();
  }

  unfollow(username: string) {
    const sub = this.followProfileService.unfollow(username).subscribe({
      next: (profile) => {
        this.profileSignal ? completeSignal(this.profileSignal, profile) : null;
        this.updaterFn ? this.updaterFn(profile) : null;
      },
      error: (err) => {
        this.profileSignal ? errorSignal(this.profileSignal, err) : null;
      },
    });

    this.subscriptions.push(sub);
  }

  dispose() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
