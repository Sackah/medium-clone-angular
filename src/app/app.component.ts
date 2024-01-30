import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {CurrentUserService} from "./shared/services/current-user.service";
import {Subscription} from "rxjs";
import {PageSpinnerComponent} from "./shared/components/loaders/page-spinner.component";
import {TokenService} from "./shared/services/token.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PageSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  currentUserService = inject(CurrentUserService);
  tokenService = inject(TokenService);
  pending = signal(false);
  subscriptions: Subscription[] = [];
  router = inject(Router);

  constructor() {
    window.addEventListener('beforeunload', () => {
      this.tokenService.setRoute(this.router.url);
    });
  }

  ngOnInit() {
    this.pending.set(true)
    this.subscriptions.push(this.currentUserService.fetchCurrentUser().subscribe({
      next: () => {
        const lastRoute = this.tokenService.getRoute();
        this.router.navigateByUrl(`${lastRoute}`).then();
        this.pending.set(false);
      },
      error: () => {
        this.pending.set(false);
        this.tokenService.clearAll();
      },
      complete: () => {
        this.pending.set(false);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    window.removeEventListener('beforeunload', () => {
      this.tokenService.setRoute(this.router.url);
    });
  }
}
