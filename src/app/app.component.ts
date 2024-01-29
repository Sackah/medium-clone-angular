import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from "./shared/components/footer/footer.component";
import {CurrentUserService} from "./shared/services/current-user.service";
import {Subscription} from "rxjs";
import {ButtonSpinnerComponent} from "./shared/components/loaders/page-spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, ButtonSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  currentUserService = inject(CurrentUserService);
  pending = signal(false);
  subscriptions: Subscription[] = [];
  router = inject(Router);

  constructor() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('lastRoute', this.router.url);
    });
  }

  ngOnInit() {
    this.pending.set(true)
    this.subscriptions.push(this.currentUserService.fetchCurrentUser().subscribe({
      next: () => {
        const lastRoute = localStorage.getItem("lastRoute");
        this.router.navigateByUrl(`${lastRoute}`).then();
        this.pending.set(false);
      },
      error: () => {
        this.pending.set(false);
      },
      complete: () => {
        this.pending.set(false);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    window.removeEventListener('beforeunload', () => {
      localStorage.setItem('lastRoute', this.router.url);
    });
  }
}
