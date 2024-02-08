import { TestBed } from '@angular/core/testing';

import { FavoriteArticleService } from './../../shared/services/favorite-article.service';

describe('FavoriteArticleService', () => {
  let service: FavoriteArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
