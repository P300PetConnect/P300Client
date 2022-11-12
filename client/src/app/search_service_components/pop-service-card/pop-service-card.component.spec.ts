import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopServiceCardComponent } from './pop-service-card.component';

describe('PopServiceCardComponent', () => {
  let component: PopServiceCardComponent;
  let fixture: ComponentFixture<PopServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopServiceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
