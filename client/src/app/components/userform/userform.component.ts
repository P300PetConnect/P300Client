import { UntypedFormGroup } from '@angular/forms';
import { IUser } from '../interfaces/users';
import { UserService } from '../service/data.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import {} from "googlemaps";


import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {

  constructor(private _serviceGetUser: UserService, private titleService: Title) { }

userData?: IUser; 
form: UntypedFormGroup; 
private formSubmitAttemp:boolean; 

public appearance = Appearance;
public zoom: number;
public latitude: number;
public longitude: number;
public selectedAddress: PlaceResult;



  ngOnInit(): void { 
    this.getUser()
    // this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');
    // this.zoom = 10;
    // this.latitude = 52.520008;
    // this.longitude = 13.404954;
    // this.setCurrentPosition();

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
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


  }

