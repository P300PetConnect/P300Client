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
  userServices:any;
  errorMessage: any;
  showOther = false;
 

  constructor( public router: Router, public r : ActivatedRoute, public search : SearchServiceService) { }

  ngOnInit(): boolean {

   this.service = this.r.snapshot.paramMap.get('service');
   this.location = this.r.snapshot.paramMap.get('location');
   this.pet = this.r.snapshot.paramMap.get('pet');


  
   this.search.getServiceData(this.pet, this.location, this.service).subscribe(
     (      results: RdsUserServices) => {
       this.userServices= ( Array.of(JSON.parse(JSON.stringify(results)))) ;
     },
     (      error: any) => this.errorMessage = <any>error
   );

   console.log(JSON.stringify(this.userServices));

   return false;


  // this.category['pet'].setValue(this.petCategory[2].viewValue);
  }
  changed(){
    if(this.isMapsDisplay){
      this.isMapsDisplay = false; 
    }
    else{
      this.isMapsDisplay = true; 
    }

  }

  // public getOtherServices(id : string)
  // {
  //   this.service.ShowOther = ! this.service.ShowOther;

  //   if( this.service.ShowOther == true)
  //   {
  //     this.search.getOtherServices(id).subscribe(
  //       (      results: RdsUserServices) => {
  //         this.otherServices= ( Array.of(JSON.parse(JSON.stringify(results)))) ;
  //       },
  //       (      error: any) => this.errorMessage = <any>error
  //     );
  
  //     console.log(this.otherServices);
  
  //     return false;

  //   }

  //   return false;
   

  // }
  
  seePetMinder(){
    this.router.navigate(['petsitterdetails'])
  }
}
