import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPlannerComponent } from './map-planner.component';

describe('MapPlannerComponent', () => {
  let component: MapPlannerComponent;
  let fixture: ComponentFixture<MapPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
