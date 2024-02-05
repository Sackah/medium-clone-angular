import {Component, Input} from '@angular/core';
import {AllArticles} from "../../../../shared/types/article.types";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-feed-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './feed-list.component.html',
  styleUrl: './feed-list.component.scss'
})
export class FeedListComponent {
  @Input() articles!: AllArticles;
}
