import {HttpClient} from '@angular/common/http';
import {inject, WritableSignal} from '@angular/core';
import {FollowProfileService} from '@shared/services/follow-profile.service';
import {Subscription, take, tap} from 'rxjs';
import {Router} from '@angular/router';
import {
   completeSignal,
   errorSignal,
   pendSignal,
} from '@app/utils/signal-factory';
import {CurrentUserService} from '@shared/services/current-user.service';
import {Profile} from '../shared/types/main.types';

export class FollowProfileWorker {
   readonly http = inject(HttpClient);
   private followProfileService = inject(FollowProfileService);
   private subscriptions: Subscription[] = [];
   private readonly profileSignal;
   private currentUserService = inject(CurrentUserService);
   private router = inject(Router);

   constructor(profileSignal?: WritableSignal<any>) {
      this.profileSignal = profileSignal;
   }

   follow(
      username: string,
      isFollowing: boolean,
      callback?: (profile: Profile) => void
   ) {
      this.profileSignal ? pendSignal(this.profileSignal) : null;

      if (isFollowing) {
         this.unfollow(username, callback);
         return;
      }

      const continueExecution = () => {
         const sub = this.followProfileService.follow(username).subscribe({
            next: (profile) => {
               this.profileSignal
                  ? completeSignal(this.profileSignal, profile)
                  : null;
               callback ? callback(profile) : null;
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
            tap(async (user) => {
               if (!user.data) {
                  await this.router.navigateByUrl('/login');
               } else {
                  continueExecution();
               }
            })
         )
         .subscribe();
   }

   private unfollow(username: string, callback?: (profile: Profile) => void) {
      const sub = this.followProfileService.unfollow(username).subscribe({
         next: (profile) => {
            this.profileSignal
               ? completeSignal(this.profileSignal, profile)
               : null;
            callback ? callback(profile) : null;
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
