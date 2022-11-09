export interface IUser {
        name: string;
        surname: string;
        dob?: Date;
        profilePicUrl?: string;
        mobileNumber?: string;
        emailAddress: string;
        petOwnerId: number;
    }

export interface IPet{
    name:string; 
    weight: string; 
    dob: Date; 
    description?:string; 
    createdDate:Date; 
    petcaracteristics:string[] ;
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