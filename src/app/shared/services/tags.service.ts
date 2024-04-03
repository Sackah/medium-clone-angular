import {MCService} from '@/app/classes/mc-service';
import {environment} from '@/environments/environment.development';
import {Injectable} from '@angular/core';
import {AllTags} from '../types/tags.types';
import {Subject, catchError} from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class TagsService extends MCService {
   private tagFilter$ = new Subject<string>();
   tagFilter = this.tagFilter$.asObservable();

   constructor() {
      super();
   }

   getTags() {
      return this.http
         .get<AllTags>(`${environment.BaseUrl}/tags`)
         .pipe(catchError((error) => this.onError(error)));
   }

   setTagFilter(tagName: string) {
      this.tagFilter$.next(tagName);
   }
}
