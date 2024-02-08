import { HttpClient } from '@angular/common/http';
import { WritableSignal, inject } from '@angular/core';
import { FollowProfileService } from '../shared/services/follow-profile.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  completeSignal,
  errorSignal,
  pendSignal,
} from '../utils/signal-factory';
import { Article, Profile } from '../shared/types/main.types';

export class FollowProfileWorker {
  readonly http = inject(HttpClient);
  private followProfileService = inject(FollowProfileService);
  private subscriptions: Subscription[] = [];
  private readonly profileSignal;
  private readonly updaterFn;

  constructor(
    profileSignal?: WritableSignal<any>,
    updaterFn?: (article?: Article, profile?: Profile) => void
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

    const sub = this.followProfileService.follow(username).subscribe({
      next: (profile) => {
        this.profileSignal ? completeSignal(this.profileSignal, profile) : null;
        this.updaterFn ? this.updaterFn(undefined, profile) : null;
      },
      error: (err) => {
        this.profileSignal ? errorSignal(this.profileSignal, err) : null;
      },
    });
    this.subscriptions.push(sub);
  }

  unfollow(username: string) {
    const sub = this.followProfileService.unfollow(username).subscribe({
      next: (profile) => {
        this.profileSignal ? completeSignal(this.profileSignal, profile) : null;
        this.updaterFn ? this.updaterFn(undefined, profile) : null;
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
