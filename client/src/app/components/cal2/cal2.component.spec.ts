import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cal2Component } from './cal2.component';

describe('Cal2Component', () => {
  let component: Cal2Component;
  let fixture: ComponentFixture<Cal2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cal2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
