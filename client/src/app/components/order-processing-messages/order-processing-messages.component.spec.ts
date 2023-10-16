import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessingMessagesComponent } from './order-processing-messages.component';

describe('OrderProcessingMessagesComponent', () => {
  let component: OrderProcessingMessagesComponent;
  let fixture: ComponentFixture<OrderProcessingMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProcessingMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProcessingMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
