export interface IUser {
        
        name: string;
        UserID?:number;
        surname: string;
        dob?: string;
        profilePicUrl?: string;
        mobileNumber?: string;
        emailAddress: string;
        petOwnerId: string;        
    }

export interface IPet{
    name: string,
    description: string,
    petImageUrl: string,
    dob: string, 
    petType:string,
    petBreed: string,
    PetSize: string,
    createdDate:string; 
}
 
export interface IOrder{
     OrderID:string, 
     PetSitterID: string, 
     PetOwnerID: string,
     OrderDate:string,
     Description: string, 
     Status: string, 
     ServiceID: string, 
     Price : string, 
     PaymentStatus: string, 
     ServiceTitle:string,
     Name:string,
     Surname:string, 
     Profile_Pic_URL:string, 
     EmailAddress:string, 
}

export enum Iform{
USERPETOWNER = 'USERPETOWNER', 
USERPETMINDER = 'USERPETMINDER', 
USERADMIN = 'USERADMIN',
}

export enum IPetType{
    DOG = 'DOG', 
    CAT = 'CAT',
    FISH = 'FISH'
}
export interface IServiceFind {
    success: boolean;
    errorMessage?: string;
  }