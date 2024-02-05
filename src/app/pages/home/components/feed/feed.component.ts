import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  feedName: 'global' | 'personal' = "global";
  @Output() feedChange = new EventEmitter<"global" | "personal">();

  ngOnInit() {
    this.feedChange.emit(this.feedName)
  }

  handleFeedChange(name: "global" | "personal") {
    this.feedName = name;
    this.feedChange.emit(name)
  }
}
