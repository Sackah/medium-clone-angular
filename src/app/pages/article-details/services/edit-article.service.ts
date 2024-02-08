import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Article} from "../../../shared/types/main.types";
import {EditArticleDetails, NewArticleResponse} from "../../../shared/types/editor.types";
import {environment} from "../../../../environments/environment.development";
import {MCService} from '../../../classes/mc-service';

@Injectable({
  providedIn: 'root'
})
export class EditArticleService extends MCService {
  private dataSource = new BehaviorSubject<Article | null>(null);
  data = this.dataSource.asObservable();
  private slug: string | undefined = undefined;

  edit(article: Article | null, slug: string | undefined = undefined) {
    this.dataSource.next(article);
    this.slug = slug;
  }

  post(article: EditArticleDetails) {
    return this.http
      .put<NewArticleResponse>(
        `${environment.BaseUrl}/articles/${this.slug}`,
        article,
        this.headers
      )
  }

  delete(slug: string) {
    return this.http
      .delete(`${environment.BaseUrl}/articles/${slug}`,
        this.headers
      )
  }
}
