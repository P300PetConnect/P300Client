import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
formFields: any;
@Input() userEmail?: any; 
user?: any; 
petsize = new FormControl('');
petsizeList: string[] = ['up to 5 kg', '5-10 kg', '10-20 kg', '20-40 kg', '+40kg'];

@ViewChild('sleepover') sleepover: ElementRef;
@ViewChild('creche') creche: ElementRef;


images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private _userService: UserService) { }

  displayAlert: boolean = false; 

  ngOnInit(): void {
  }

  setSelected(id:number){
    console.log(id); 
    if(id==1){
      this.sleepover.nativeElement.hidden = false; 
      this.creche.nativeElement.hidden = true; 
    }
    else if(id==2){
      this.sleepover.nativeElement.hidden = true; 
      this.creche.nativeElement.show = true; 
  }
  }


  SearchService(){
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
