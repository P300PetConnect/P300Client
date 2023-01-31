export enum EOrderStatus {
    Pendent = 'Pendent',
    Processing = 'Processing',
    Review = 'Review',
    Canceled = 'Canceled', 
    Delivered = 'Delivered', 
  }
  
  export enum EPaymentStatus{
    Pendent = 'Pendent',
    Declined = 'Declined', 
    Confirmed = 'Confirmed', 
    Refounded = 'Confirmed', 
  }

  export interface IPetCategory {
    value: string;
    viewValue: string;
  }

  export interface IServiceCategory {
    value: string;
    viewValue: string;
  }
  