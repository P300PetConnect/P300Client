import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetOwnerProfileDetailsComponent } from './pet-owner-profile-details.component';

describe('PetOwnerProfileDetailsComponent', () => {
  let component: PetOwnerProfileDetailsComponent;
  let fixture: ComponentFixture<PetOwnerProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetOwnerProfileDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetOwnerProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
