import {Component, inject, Input, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Profile} from '@shared/types/main.types';
import {User} from '@shared/types/auth.types';
import {McSpinnerComponent} from '@shared/components/loaders/mc-spinner.component';
import {FollowProfileWorker} from '@/app/workers/followers.worker';
import {newSignal} from '@app/utils/signal-factory';

@Component({
   selector: 'mc-profile-banner',
   standalone: true,
   imports: [McSpinnerComponent],
   templateUrl: './profile-banner.component.html',
   styleUrl: './profile-banner.component.scss',
})
export class ProfileBannerComponent implements OnDestroy {
   @Input({required: true}) user!: User;
   @Input({required: true}) userProfile!: Profile;
   @Input({required: true}) pending = false;
   router = inject(Router);
   followerWorker;
   followSignal = newSignal<Profile>();

   constructor() {
      this.followerWorker = new FollowProfileWorker(this.followSignal);
   }

   async navigate() {
      await this.router.navigateByUrl('/settings');
   }

   followProfile(username: string, following: boolean) {
      this.followerWorker.follow(username, following, (profile) => {
         this.userProfile = {...this.userProfile, ...profile};
      });
   }

   ngOnDestroy() {
      this.followerWorker.dispose();
   }
}
