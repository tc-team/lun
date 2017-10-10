import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSocialComponent } from './profile-social.component';

describe('ProfileSocialComponent', () => {
  let component: ProfileSocialComponent;
  let fixture: ComponentFixture<ProfileSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
