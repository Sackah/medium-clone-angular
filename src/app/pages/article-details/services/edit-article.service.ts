import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Article} from "../../../shared/types/main.types";

@Injectable({
  providedIn: 'root'
})
export class EditArticleService {
  private dataSource = new BehaviorSubject<Article | null>(null);
  data = this.dataSource.asObservable();

  constructor() {
  }

  edit(article: Article) {
    this.dataSource.next(article);
  }
}
