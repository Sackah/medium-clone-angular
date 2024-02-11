import { WritableSignal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../pages/profile/services/profile.service';
import {
  completeSignal,
  errorSignal,
  pendSignal,
} from '../utils/signal-factory';
import { Subscription } from 'rxjs';

export class ProfileWorker {
  private readonly route;
  private readonly signal;
  private readonly extraSignals;
  private readonly profileService = inject(ProfileService);
  private readonly subscriptions: Subscription[] = [];

  constructor(
    route: ActivatedRoute,
    signal: WritableSignal<any>,
    extraSignals?: WritableSignal<any>[]
  ) {
    this.route = route;
    this.signal = signal;
    this.extraSignals = extraSignals;
  }

  public fetchProfile(callback?: () => void) {
    const sub = this.route.params.subscribe({
      next: (params) => {
        const username = params['userName'];
        pendSignal(this.signal);
        if (this.extraSignals && this.extraSignals.length > 0) {
          this.extraSignals.forEach((signal) => pendSignal(signal));
        }

        const sub = this.profileService.get(username).subscribe({
          next: (profile) => {
            completeSignal(this.signal, profile);
            if (callback) {
              callback();
            }
          },
          error: (err) => {
            errorSignal(this.signal, err);
          },
        });

        this.subscriptions.push(sub);
      },
    });

    this.subscriptions.push(sub);
  }

  public dispose() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
