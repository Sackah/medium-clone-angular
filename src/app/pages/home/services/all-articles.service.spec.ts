import { TestBed } from '@angular/core/testing';

import { AllArticlesService } from './all-articles.service';

describe('AllArticlesService', () => {
  let service: AllArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
