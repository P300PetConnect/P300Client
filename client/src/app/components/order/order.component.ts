import { Component, ElementRef, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageAlertComponent } from '../message-alert/message-alert.component';
import { MatStepper } from '@angular/material/stepper';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';



interface petCategory {
  value: string;
  viewValue: string;
}
interface serviceCategory {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  
selectedPet = '';
selectedCategories: any;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: '',
  });
  isOptional = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  positivekeywordsCtrl = new FormControl('');
  
  filteredpositivekeywordss: Observable<string[]>;
  positivekeywordss: string[] = ['morning walk'];
  allpositivekeywordss: string[] = ['Take care', 'Minder', 'Overnight', 'Feed'];

  @ViewChild('positivekeywordsInput') positivekeywordsInput: ElementRef<HTMLInputElement>;
  @ViewChild('stepper')
  stepper: MatStepper;
  
  
  constructor(private _formBuilder: FormBuilder, private dialog:MatDialog) { 
    this.filteredpositivekeywordss = this.positivekeywordsCtrl.valueChanges.pipe(
      startWith(null),
      map((positivekeywords: string | null) => (positivekeywords ? this._filter(positivekeywords) : this.allpositivekeywordss.slice())),
    );

  }

  ngOnInit(): void {

  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our positivekeywords
    if (value) {
      this.positivekeywordss.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.positivekeywordsCtrl.setValue(null);
  }

   


  remove(positivekeywords: string): void {
    const index = this.positivekeywordss.indexOf(positivekeywords);

    if (index >= 0) {
      this.positivekeywordss.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.positivekeywordss.push(event.option.viewValue);
    this.positivekeywordsInput.nativeElement.value = '';
    this.positivekeywordsCtrl.setValue(null);
  }

  onBack(stepper: MatStepper){
    stepper.previous();
}
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allpositivekeywordss.filter(positivekeywords => positivekeywords.toLowerCase().includes(filterValue));
  }

  category= new FormControl('');
  service=new FormControl(''); 

petCategory: petCategory[] = [
  {value: '../../../assets/images/home/boarding-selected.svg', viewValue: 'Dog'},
  {value: '../../../assets/images/home/walk-selected.svg', viewValue: 'Cat'},
  {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Bird'},
  {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Fish'},

];
serviceCategory: serviceCategory[] = [
  {value: '../../../assets/images/home/boarding-selected.svg', viewValue: 'Accommodation'},
  {value: '../../../assets/images/home/walk-selected.svg', viewValue: 'Mind'},
  {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Walk'},
  {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Just feed'},

];

  onCancel(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = false; 
    dialogConfig.width = "40%";
    dialogConfig.height = "31%";
    this.dialog.open(MessageAlertComponent, dialogConfig)
    console.log(this.stepper.selectedIndex); 

  }

  changePet(value)
  {
    let obj = JSON.parse(JSON.stringify(value));
    this.selectedPet = obj[0].viewValue;
    console.log('services selected: ', this.service.value); 
  }


  onClose(){
    this.dialog.closeAll(); 
  }

  //url; //Angular 8
	url: any; //Angular 11, for stricter type
	msg = "";
  icon = ""
  isShow:boolean = true; 
	
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
      this.isShow = false; 

			this.url = reader.result; 
		}
	}
  


}



