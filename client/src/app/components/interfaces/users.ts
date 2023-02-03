export interface IUser {
        name: string;
        surname: string;
        dob?: Date;
        profilePicUrl?: string;
        mobileNumber?: string;
        emailAddress: string;
        petOwnerId: number;
    }

    //data being returned straight from DB, Different keys 
export interface IPetSitterID{
    Name: string;
    Surname: string;
    DOB?: any;
    JoinDate?: Date;
    Profile_Pic_URL?: string;
    MobileNumber?: string;
    EmailAddress?: string;
    PetSitterID?: number;
    Line_1?: string;
    Line_2?: string;
    City?: string;
    County?: string;
    ZipCode?: string;
    Country?: string;
    NumReviews?: number;
    ReviewsTotal?:number;
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
    numReviews?: number;
    reviewsTotal?:number;
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

//   export interface IPetSitter{
//     name: string;
//     surname: string;
//     dob?: any;
//     joinDate?: Date;
//     profilePicUrl?: string;
//     mobileNumber?: string;
//     emailAddress?: string;
//     petSitterId?: number;
//     line1?: string;
//     line2?: string;
//     city?: string;
//     county?: string;
//     zipCode?: string;
//     country?: string;
//     numReviews: number;
//     reviewsTotal:number;
// }