import { UntypedFormGroup } from '@angular/forms';
import { IUser } from '../interfaces/users';
import { UserService } from '../service/data.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import {} from "googlemaps";
import { Container, EnterExitLeft, EnterExitRight } from './enterexitleft';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'], 
  animations: [Container, EnterExitLeft, EnterExitRight],

})
export class UserformComponent implements OnInit {
  
  constructor(private _serviceGetUser: UserService, private titleService: Title) { }

userData?: IUser; 
form: UntypedFormGroup; 
public appearance = Appearance;
public zoom: number;
public latitude: number;
public longitude: number;
public selectedAddress: PlaceResult;

isDisplay = false; 

//ICONS
iconChecked = "bi bi-check-circle";
iconNotChecked = "bi bi-circle";

iconStage1: string = this.iconNotChecked;
iconStage2: string = this.iconNotChecked;
iconStage3: string = this.iconNotChecked;

  ngOnInit(): void { 
    this.getUser(); 

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
    this._serviceGetUser.get_user("Frank@hotmail.com").subscribe(
      userData=>{
        this.userData = userData;
        console.log(userData)
      }); 
      return false; 
    }

 skipImage(){
  this.isDisplay = true; 
  this.iconStage1 = this.iconChecked;

 }
 isDisplayed = true;

 toggleIsDisplayed(): void {
   this.isDisplayed = !this.isDisplayed;
 }
}

  
