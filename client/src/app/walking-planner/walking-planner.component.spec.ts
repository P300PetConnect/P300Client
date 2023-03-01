import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkingPlannerComponent } from './walking-planner.component';

describe('WalkingPlannerComponent', () => {
  let component: WalkingPlannerComponent;
  let fixture: ComponentFixture<WalkingPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkingPlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkingPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
