import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSitterDetailsComponent } from './pet-sitter-details.component';

describe('PetSitterDetailsComponent', () => {
  let component: PetSitterDetailsComponent;
  let fixture: ComponentFixture<PetSitterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetSitterDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetSitterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
