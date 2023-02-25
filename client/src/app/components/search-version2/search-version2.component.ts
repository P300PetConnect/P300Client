import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { RdsUserServices } from 'src/app/search_service_interfaces/rds-user-services';
import { SearchServiceService } from 'src/app/search_service_services/search-service.service';
import { IPet } from '../interfaces/form';
import { PetService } from '../service/pet.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PetComponent } from '../pet/pet.component';
import { MapsAPILoader } from '@agm/core';
import { GeocodingService } from '../geocoding.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface serviceCategory {
  value: string;
  viewValue: string;
}
interface petCategory {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-version2',
  templateUrl: './search-version2.component.html',
  styleUrls: ['./search-version2.component.scss']
})
export class SearchVersion2Component implements OnInit {

  selected = "";
  reviewForm = false;
  public petDetails:IPet[]; 
  public lat: number[] = [];
  public lng: number[] = [];

  serviceCategories: serviceCategory[] = [
    {value: '../../../assets/images/home/boarding-selected.svg', viewValue: 'Accomodation'},
    {value: '../../../assets/images/home/walk-selected.svg', viewValue: 'Walk'},
    {value: "../../../assets/images/home/daycare-selected.svg", viewValue: 'Mind Pet'},
    {value: "../../../assets/images/home/petsitting-selected.svg", viewValue: 'Just Feed'}
  ];

  breed= new FormControl('');
  petBreed: serviceCategory[] = [
    {value: '../../../assets/images/home/boarding-selected.svg', viewValue: 'Affenwich'},
    {value: '../../../assets/images/home/walk-selected.svg', viewValue: 'Rottle'},
    {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Schnocker'},
  ];

  petsize = new FormControl('');
  petsizeList: string[] = ['up to 5 kg', '5-10 kg', '10-20 kg', '20-40 kg', '+40kg'];

  private readonly GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';



  petCategory: petCategory[] = [
    {value: 'Dog', viewValue: 'Dog'},
    {value: 'Cat', viewValue: 'Cat'},
    {value: 'Bird', viewValue: 'Bird'},
    {value: 'Fish', viewValue: 'Fish'},

  ];

  category= new FormControl({
    pet: new FormControl('test')
  });
  isMapsDisplay: boolean = false; 


  service = '';
  location = '';
  pet = '';  

  errorMessage: any;
  showOther = false;
  message: any;
  userServices:RdsUserServices[] = [];

  markers: any[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: "A",
      draggable: true,
      content: "InfoWindow content",
      color: "#FFFFFF",
      iconUrl: "https://s3-images-web-ca2.s3.eu-west-1.amazonaws.com/Screenshot_2023-02-25_at_18.46.34-removebg-preview+(1).png"
    }

  ]
  constructor( public router: Router,   private http: HttpClient,  private mapsAPILoader: MapsAPILoader,private geoCodingService: GeocodingService,
    private ngZone: NgZone, public r : ActivatedRoute, public search : SearchServiceService, private dialog:MatDialog, private _petService:PetService,public authenticator: AuthenticatorService,) { }

  ngOnInit(): void {

   this.service = this.r.snapshot.paramMap.get('service');
   this.location = this.r.snapshot.paramMap.get('location');
   this.pet = this.r.snapshot.paramMap.get('pet');
   this.getLatLng('11 glenard, ballinode')
   this.SearchService(this.pet, this.location, this.service);
  this.getPetDetails(); 
 this.mapsAPILoader.load().then(() => {
});


}


getAddressByUser(address:string, PetSitter:any){
  console.log(PetSitter); 

  this.getLatLng(address).subscribe((location) => {
    this.lat.push(location.lat);
    this.lng.push(location.lng); 
    console.log('latitude', this?.lat); 
    console.log(this?.lng);

    this.markers.push({
      lat: location.lat,
      lng: location.lng,
      draggable: true,
      content: PetSitter?.Name +' '+PetSitter?.Surname,
      iconUrl:'https://s3-images-web-ca2.s3.eu-west-1.amazonaws.com/Screenshot_2023-02-25_at_18.46.34-removebg-preview+(1).png'

    });
  });
  console.log('markes', this?.markers); 

}

  SearchService(pet : string, location : string , service: string)
  {
    
    console.log(pet + '  ' + this.location + '  ' + service);

    this.search.getServiceData(pet, location, service).subscribe({
      next: (value: RdsUserServices[] )=>this.userServices = value,
      complete: () => console.log('Review service finished ' +  JSON.stringify((this.userServices))),
      error: (mess) => this.message = mess
    })

  }

  setLocation(loc: string)
  {
    this.location = loc;
    
  }

  async getPetDetails(){
    try{
      const petDetails =  await this._petService.get_petdetails(this.authenticator?.user?.attributes?.email).toPromise()
      this.petDetails = petDetails; 
      console.log(petDetails)
     }catch (error) {
      console.error(error);
    }
}

  newSearchRequest(pet: string, service: string)
  {
    this.SearchService(pet, this.location, service);
  }
  


  changed(){
    if(this.isMapsDisplay){
      this.isMapsDisplay = false; 
    }
    else{

      this.isMapsDisplay = true; 
       this.lat = [];
       this.lng= [];
       this.markers = []; 

      this.userServices.forEach(element => {
        this.getAddressByUser(element?.Line_1 + ' '+element?.Line_2 + ' '+element?.County,element)
        console.log('full address', element?.Line_1 + ' '+element?.Line_2 + ' '+element?.County)
      });
    }

  }
  
  AddNewPet(){
        const dialogConfig = new MatDialogConfig(); 
        dialogConfig.disableClose = false; 
        dialogConfig.autoFocus = true; 
        dialogConfig.width = "60%";
        this.dialog.open(PetComponent, dialogConfig)
  }
  public getLatLng(address: string): Observable<any> {
    const url = `${this.GEOCODING_API_URL}?address=${encodeURIComponent(address)}&key=AIzaSyCz-Nu0ku-0DJEe5iPt13RTq0QVpiz45AY`;

    return this.http.get(url).pipe(
      map(response => {
        const result = response['results'][0];
        const location = result?.geometry?.location;
        return {
          lat: location?.lat,
          lng: location?.lng
        };
      })
    );
  }
  
  seePetMinder(){
    this.router.navigate(['petsitterdetails'])
  }
  closeForm()
  {
    this.reviewForm = false;
  }
}
