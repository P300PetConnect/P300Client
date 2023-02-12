import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAvailableFormComponent } from './not-available-form.component';

describe('NotAvailableFormComponent', () => {
  let component: NotAvailableFormComponent;
  let fixture: ComponentFixture<NotAvailableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAvailableFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAvailableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
