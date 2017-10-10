import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFavouriteComponent } from './profile-favourite.component';

describe('ProfileFavouriteComponent', () => {
  let component: ProfileFavouriteComponent;
  let fixture: ComponentFixture<ProfileFavouriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFavouriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
