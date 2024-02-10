import { ActivatedRoute } from '@angular/router';

export class ProfileWorker {
  readonly route;

  constructor(route: ActivatedRoute) {
    this.route = route;
  }
}
