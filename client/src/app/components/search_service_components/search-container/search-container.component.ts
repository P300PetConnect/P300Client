import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ServiceInterface } from 'src/app/interfaces/service-interface';
import { SearchServiceService } from 'src/app/service/search-service.service';
import { RdsUserServices } from 'src/app/interfaces/rds-user-services';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {

  services: ServiceInterface[] = [];

  isSearching = false;
  errorMessage : any;
  animal = "dog";
  service = "walking";
  userServices?: any;

  infoString = '';
  hasSelected = false;
  selectedService = '';


    //jessica's code for search bar

formFields: any;
@Input() userEmail?: any; 
user?: any; 
isActive: boolean = true; 
secondIsActive: boolean = false; 
thirdIsActive: boolean = false; 
fourthIsActive: boolean = false; 
sleepOver : boolean = false; 

petsize = new FormControl('');
petType = new FormControl('');
petsizeList: string[] = ['up to 5 kg', '5-10 kg', '10-20 kg', '20-40 kg', '+40kg'];
petTypeList: string[] = ['Dog', 'Cat'];

@ViewChild('sleepover') sleepover: ElementRef;
@ViewChild('creche') creche: ElementRef;

images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


  displayAlert: boolean = false; 
  selectedIndex: number = null;


  constructor(private search: SearchServiceService) { }

  ngOnInit(): void {
   
 
    console.log(this.services);
  }
  setSelected(id:number){
    console.log(id); 
    this.hasSelected = true;
  
    if(id==1){
      this.isActive = true;
      this.fourthIsActive = false;
      this.secondIsActive=false; 
      this.thirdIsActive=false;  
      this.sleepOver = true; 

      this.infoString = 'A trusted pet minder hosts your puppy for one night or more';
      this.selectedService = 'Sleepover'
    }
    else if(id==2){
      this.isActive = false;
      this.secondIsActive=true; 
      this.thirdIsActive=false; 
      this.fourthIsActive = false; 
      this.sleepOver = false; 

      this.infoString = "Fun and attention during the day at a Minder's house";
      this.selectedService = 'Daycare'
}
else if(id==3){
  this.isActive = false;
  this.secondIsActive=false;
  this.thirdIsActive=true; 

  this.infoString = 'A Minder comes to your house to take care of your pet for 60 min.';
  this.selectedService = 'House'
}
else if(id==4){
  this.isActive = false;
  this.secondIsActive=false;
  this.thirdIsActive=false; 
  this.fourthIsActive = true; 

  this.infoString = '30 to 60 min or 2 to 5 km walks for your dog to burn off energy';
  this.selectedService = 'Walking'
}
  }

  SearchService(animal: string, location: string){

    console.log(animal +  location + this.selectedService);

    this.isSearching = true;
    this.search.getServiceData(animal, location, this.selectedService).subscribe(
      (      results: RdsUserServices) => {
        this.userServices= ( Array.of(JSON.parse(JSON.stringify(results)))) ;
      },
      (      error: any) => this.errorMessage = <any>error
    );

    console.log(this.userServices);

    return false;

  }
  getStarted(){
    if(this.displayAlert){
      this.displayAlert = false;
    }
    else{
      this.displayAlert = true; 
    }
  }


}


// GetUserServices( animal: string, service: string): boolean{

//   this.isSearching = true;
//   this.search.getServiceData(animal, service).subscribe(
//     (      results: RdsUserServices) => {
//       this.userServices= ( Array.of(JSON.parse(JSON.stringify(results)))) ;
//     },
//     (      error: any) => this.errorMessage = <any>error
//   );

//   console.log(this.userServices);

//   return false;
// }
