import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RdsUserServices } from 'src/app/search_service_interfaces/rds-user-services';
import { SearchServiceService } from 'src/app/search_service_services/search-service.service';

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

  


  petCategory: petCategory[] = [
    {value: 'Dog', viewValue: 'Dog'},
    {value: 'Cat', viewValue: 'Cat'},
    {value: 'Bird', viewValue: 'Bird'},
    {value: 'Fish', viewValue: 'Fish'},

  ];

  category= new FormControl({
    pet: new FormControl('test')
  });
  lat = 54.2792;
  lng = -8.471640;
  isMapsDisplay: boolean = false; 


  service = '';
  location = '';
  pet = '';  

  errorMessage: any;
  showOther = false;
  message: any;
  userServices:RdsUserServices[] = [];
 
 

  constructor( public router: Router, public r : ActivatedRoute, public search : SearchServiceService) { }

  ngOnInit(): void {

   this.service = this.r.snapshot.paramMap.get('service');
   this.location = this.r.snapshot.paramMap.get('location');
   this.pet = this.r.snapshot.paramMap.get('pet');

   this.SearchService(this.pet, this.location, this.service);
  // this.category['pet'].setValue(this.petCategory[2].viewValue);
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

  newSearchRequest(pet: string, service: string)
  {
    //needs ro be refactored here// 
    
    this.SearchService(pet, this.location, service);
  }
  


  changed(){
    if(this.isMapsDisplay){
      this.isMapsDisplay = false; 
    }
    else{
      this.isMapsDisplay = true; 
    }

  }
  


  seePetMinder(){
    this.router.navigate(['petsitterdetails'])
  }
  closeForm()
  {
    this.reviewForm = false;
  }
}
