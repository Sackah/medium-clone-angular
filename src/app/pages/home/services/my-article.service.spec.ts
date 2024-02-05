import { TestBed } from '@angular/core/testing';

import { MyArticlesService } from './my-articles.service';

describe('MyArticleService', () => {
  let service: MyArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
