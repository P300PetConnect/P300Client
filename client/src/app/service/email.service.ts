import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmailService {
  private orderCreatedUrl = 'https://fff6cc2r06.execute-api.eu-west-1.amazonaws.com/default/sendOrderPlacedEmailLambda';
  private orderConfirmedUrl = 'https://aux8jeddzh.execute-api.eu-west-1.amazonaws.com/default/sendOrderConfirmedEmailLambda';
  private startChatUrl = 'https://bf2qksuqia.execute-api.eu-west-1.amazonaws.com/default/sendMessageEmail';

  constructor(private http: HttpClient) { }

  sendOrderPlacedEmail() {
    return this.http.get(this.orderCreatedUrl);
  }

  sendOrderConfirmedEmail() {
    return this.http.get(this.orderConfirmedUrl);
  }

  sendStartChatMessageEmail() {
    return this.http.get(this.startChatUrl);
  }
}
