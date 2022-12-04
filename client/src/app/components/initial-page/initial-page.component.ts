import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
interface petCategory {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
formFields: any;
@Input() userEmail?: any; 
user?: any; 
isActive: boolean = true; 
secondIsActive: boolean = false; 
thirdIsActive: boolean = false; 
fourthIsActive: boolean = false; 
sleepOver : boolean = false; 

service = '';
selectedPet = '';

petsize = new FormControl('');
petsizeList: string[] = ['up to 5 kg', '5-10 kg', '10-20 kg', '20-40 kg', '+40kg'];

@ViewChild('sleepover') sleepover: ElementRef;
@ViewChild('creche') creche: ElementRef;

category= new FormControl('');

petCategory: petCategory[] = [
  {value: '../../../assets/images/home/boarding-selected.svg', viewValue: 'Dog'},
  {value: '../../../assets/images/home/walk-selected.svg', viewValue: 'Cat'},
  {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Bird'},
  {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Fish'},

];

images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private _userService: UserService, private _router: Router) { }

  displayAlert: boolean = false; 
  selectedIndex: number = null;
  
  ngOnInit(): void {
  }

  setSelected(id:number){
    console.log(id); 
    if(id==1){
      this.isActive = true;
      this.fourthIsActive = false;
      this.secondIsActive=false; 
      this.thirdIsActive=false;  
      this.sleepOver = true; 
      this.service = 'Accommodation'
    }
    else if(id==2){
      this.isActive = false;
      this.secondIsActive=true; 
      this.thirdIsActive=false; 
      this.fourthIsActive = false; 
      this.sleepOver = false; 

      this.service = 'Mind Pet'
}
else if(id==3){
  this.isActive = false;
  this.secondIsActive=false;
  this.thirdIsActive=true; 
  this.service = 'Just Feed'
}
else if(id==4){
  this.isActive = false;
  this.secondIsActive=false;
  this.thirdIsActive=false; 
  this.fourthIsActive = true; 

  this.service = 'Walk'
}
  }

  changePet(value)
  {
    let obj = JSON.parse(JSON.stringify(value));
    this.selectedPet = obj[0].viewValue;

   
  }


  SearchService(location: string){
    console.log('find')
    this._router.navigate(['/search2', {'service': `${this.service}`, 'location': `${location}`, 'pet': `${this.selectedPet}`}])
    this.sleepover.nativeElement.hidden; 
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
