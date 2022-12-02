import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  serviceCategories: serviceCategory[] = [
    {value: '../../../assets/images/home/boarding-selected.svg', viewValue: 'Accomodation'},
    {value: '../../../assets/images/home/walk-selected.svg', viewValue: 'Walk'},
    {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Crache'},
  ];

  breed= new FormControl('');
  petBreed: serviceCategory[] = [
    {value: '../../../assets/images/home/boarding-selected.svg', viewValue: 'Affenwich'},
    {value: '../../../assets/images/home/walk-selected.svg', viewValue: 'Rottle'},
    {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Schnocker'},
  ];

  petsize = new FormControl('');
  petsizeList: string[] = ['up to 5 kg', '5-10 kg', '10-20 kg', '20-40 kg', '+40kg'];

  
  category= new FormControl('');

  petCategory: petCategory[] = [
    {value: '../../../assets/images/home/boarding-selected.svg', viewValue: 'Dog'},
    {value: '../../../assets/images/home/walk-selected.svg', viewValue: 'Cat'},
    {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Bird'},
    {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Fish'},

  ];
  lat = 54.2792;
  lng = -8.471640;
  isMapsDisplay: boolean = false; 

  constructor() { }

  ngOnInit(): void {
  }
  changed(){
    if(this.isMapsDisplay){
      this.isMapsDisplay = false; 
    }
    else{
      this.isMapsDisplay = true; 
    }

  }
  
}
