import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFeedHeaderComponent } from './profile-feed-header.component';

describe('ProfileFeedHeaderComponent', () => {
  let component: ProfileFeedHeaderComponent;
  let fixture: ComponentFixture<ProfileFeedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFeedHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileFeedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
