import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Article} from "../../../shared/types/main.types";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EditArticleDetails, NewArticleResponse} from "../../../shared/types/editor.types";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class EditArticleService {
  private dataSource = new BehaviorSubject<Article | null>(null);
  data = this.dataSource.asObservable();
  private http = inject(HttpClient);
  private slug: string = '';

  constructor() {
  }

  private get headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  edit(article: Article, slug: string) {
    this.dataSource.next(article);
    this.slug = slug;
  }

  post(article: EditArticleDetails) {
    return this.http
      .put<NewArticleResponse>(
        `${environment.BaseUrl}/articles${this.slug}`,
        article,
        this.headers
      )
  }
}
