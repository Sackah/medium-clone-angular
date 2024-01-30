import { TestBed } from '@angular/core/testing';

import { FetchArticleService } from './fetch-article.service';

describe('FetchArticleService', () => {
  let service: FetchArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
