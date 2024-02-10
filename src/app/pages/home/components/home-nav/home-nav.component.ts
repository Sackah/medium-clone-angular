import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CurrentUserService, UserData} from "@shared/services/current-user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'mc-home-nav',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home-nav.component.html',
  styleUrls: ['../../../../shared/styles/nav.styles.scss']
})
export class HomeNavComponent implements OnInit, OnDestroy {
  currentUserService = inject(CurrentUserService);
  subscriptions: Subscription[] = [];
  userData!: UserData;

  ngOnInit() {
    const subscription = this.currentUserService.user.subscribe({
      next: (data) => {
        this.userData = data;
      }
    })
    this.subscriptions.push(subscription)
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
  }
}
