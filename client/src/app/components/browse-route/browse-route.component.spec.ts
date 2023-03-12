import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRouteComponent } from './browse-route.component';

describe('BrowseRouteComponent', () => {
  let component: BrowseRouteComponent;
  let fixture: ComponentFixture<BrowseRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
