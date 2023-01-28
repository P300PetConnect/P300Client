export interface IUser {
        name: string;
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
    // petType: IPetType
    petType:string,
    petBreed: string,
    PetSize: string,
    createdDate:string; 
    // petcaracteristics:string;
}
 
export interface IOrder{
     PetSitterID: string, 
     PetOwnerID: string,
     OrderDate:string,
     Description: string, 
     Status: string, 
     ServiceID: string, 
     Price : string, 
     PaymentStatus: string
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