import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerOrderComponent } from './tracker-order.component';

describe('TrackerOrderComponent', () => {
  let component: TrackerOrderComponent;
  let fixture: ComponentFixture<TrackerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
