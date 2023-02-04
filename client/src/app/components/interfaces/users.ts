export interface IUser {
        name: string;
        surname: string;
        dob?: Date;
        profilePicUrl?: string;
        mobileNumber?: string;
        emailAddress: string;
        petOwnerId: number;
        chatUserName: string;
        chatToken: string;
    }

export interface IPetSitter{
    name: string;
    surname: string;
    dob?: any;
    joinDate?: Date;
    profilePicUrl?: string;
    mobileNumber?: string;
    emailAddress?: string;
    petSitterId?: number;
    line1?: string;
    line2?: string;
    city?: string;
    county?: string;
    zipCode?: string;
    country?: string;
}

export interface IPetOwner{
    name: string;
    surname: string;
    dob?: Date;
    joinDate?: Date;
    profilePicUrl?: string;
    mobileNumber?: string;
    emailAddress?: string;
    petOwnerId?: number;
    line1?: string;
    line2?: any;
    city?: string;
    county?: string;
    zipCode?: string;
    country?: string;
}

// export class PetOwner{
//     name: string;
//     surname: string;
//     dob: Date;
//     joinDate: Date;
//     profilePicUrl: string;
//     mobileNumber: string;
//     emailAddress: string;
//     petOwnerId: number;
//     line1: string;
//     line2: any;
//     city: string;
//     county: string;
//     zipCode: string;
//     country: string;

//     constructor(name: string, surname: string, dob: Date, joinDate: Date, profilePicUrl:string, mobileNumber:string, 
//         emailAddress: string, petOwnerId: number, line1: string, line2: any, city: string, county: string, zipCode: string, 
//         country: string) {
//         this.name = name; 
//         this.surname = surname; 
//         this.dob = dob; 
//         this.joinDate = joinDate; 
//         this.profilePicUrl = profilePicUrl;  
//         this.mobileNumber = mobileNumber; 
//         this.emailAddress = emailAddress; 
//         this.petOwnerId =petOwnerId; 
//         this.line1 = line1; 
//         this.line2 = line2; 
//         this.city = city; 
//         this.county = county; 
//         this.zipCode = zipCode;
//     }

// }

export interface IPet{
        petId: number;
        name: string;
        dob: Date;
        description: string;
        joinDate: Date;
        petImageUrl: string;
        petOwnerId: number;
        petType: string;
        petBreed: string;
        petSize?: any;
}

export enum Iform{
USERPETOWNER = 'USERPETOWNER', 
USERPETMINDER = 'USERPETMINDER', 
USERADMIN = 'USERADMIN',
}

export interface IServiceFind {
    success: boolean;
    errorMessage?: string;
  }