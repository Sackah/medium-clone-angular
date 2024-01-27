import {OnInit, OnDestroy, Component, inject} from "@angular/core";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

@Component({standalone: true, template: ''})
export class McPage implements OnInit, OnDestroy{
  subscriptions: Subscription[] = [];
  store = inject(Store);

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.subscriptions.length > 1){
      this.subscriptions.forEach((sub)=>sub.unsubscribe());
    }
  }
}
