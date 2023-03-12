import { UntypedFormGroup } from '@angular/forms';
import { IUser } from '../../interfaces/form';
import { UserService } from '../../service/user.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import {} from "googlemaps";
import { Container, EnterExitLeft, EnterExitRight } from './enterexitleft';
import PlaceResult = google.maps.places.PlaceResult;
import { PetService } from '../../service/pet.service';
import { IPetOwner } from '../../interfaces/users';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'], 
  animations: [Container, EnterExitLeft, EnterExitRight],

})
export class UserformComponent implements OnInit {
constructor(private _serviceGetUser: UserService, private titleService: Title, public _positivekeywords: PetService) { }
userData?: IPetOwner; 
form: UntypedFormGroup; 
public appearance = Appearance;
public zoom: number;
public latitude: number;
public longitude: number;
public selectedAddress: PlaceResult;
isShowSection1: boolean = true; 
isShowSection2: boolean = true; 
profileImage:string = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'; 
petProfileImage:string = 'https://cdn4.vectorstock.com/i/1000x1000/33/03/akita-head-dog-profile-vector-24973303.jpg'; 

petList: Array<any> = [
  { name: 'Select Pet Type', breeds:['Select Breed']},
  { name: 'Dog', breeds: ['Africanis', 'Aidi', 'Airedale Terrier','Akbash'] },
  { name: 'Cat', breeds: ['Abyssinian Cat', 'Shorthair Cat', 'Birman'] },
  { name: 'Bird', breeds: ['Piu'] },
  { name: 'Fish', breeds: ['Gold'] },
];
breeds: Array<any>;
changeCountry(pettype) {
  this.breeds = this.petList.find(con => con.name == pettype).breeds;
}

isDisplay = false; 

//ICONS
iconChecked = "bi bi-check-circle-fill";
iconNotChecked = "bi bi-circle";

iconStage1: string = this.iconNotChecked;
iconStage2: string = this.iconNotChecked;
iconStage3: string = this.iconNotChecked;
stepClass:string="stepCompleted1"; 
stepClass2:string="stepNotCompleted"; 
stepClass3:string="stepNotCompleted"; 


  ngOnInit(): void { 
    this.getUser(); 
    // console.log(this._positivekeywords.getPets());
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

 onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
  }

  getUser(){
    this._serviceGetUser.get_petowner("fatherted@gmail.com").subscribe(
      userData=>{
        this.userData = userData;
        console.log(userData)
      }); 
      return false; 
    }

    backToPreview(){
      if(!this.isShowSection1 && this.isShowSection2){
        this.isShowSection2 = false; 
        this.isShowSection1 = true; 
        if(this.iconStage2!=this.iconChecked){
          this.stepClass2 = "stepCompleted"

        }
      }
    }

 skipImage(){
  this.stepClass2 = "stepCompleted"
  if(!this.isShowSection1){
    this.iconStage2 = this.iconChecked;
    this.isShowSection2 = false; 
    this.stepClass3="stepCompleted";
  }
  this.isShowSection1 = false; 
  this.isDisplay = true; 
  this.iconStage1 = this.iconChecked;

 }
 isDisplayed = true;

 toggleIsDisplayed(): void {
   this.isDisplayed = !this.isDisplayed;
 }

 selectedValue: string;
 selectedCar: string;
}

  
