import { TestBed } from '@angular/core/testing';

import { NewArticleService } from './new-article.service';

describe('NewArticleService', () => {
  let service: NewArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
