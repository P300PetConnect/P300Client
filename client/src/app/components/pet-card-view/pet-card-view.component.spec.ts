import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCardViewComponent } from './pet-card-view.component';

describe('PetCardViewComponent', () => {
  let component: PetCardViewComponent;
  let fixture: ComponentFixture<PetCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetCardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
