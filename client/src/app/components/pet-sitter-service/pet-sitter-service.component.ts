import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageAlertComponent } from '../message-alert/message-alert.component';
import { MatStepper } from '@angular/material/stepper';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Data } from '@angular/router';
import { SearchServiceService } from 'src/app/search_service_services/search-service.service';

@Component({
  selector: 'app-pet-sitter-service',
  templateUrl: './pet-sitter-service.component.html',
  styleUrls: ['./pet-sitter-service.component.scss']
})
export class PetSitterServiceComponent implements OnInit {
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
  id: any;
  message: any;

  @ViewChild('positivekeywordsInput') positivekeywordsInput: ElementRef<HTMLInputElement>;
  @ViewChild('stepper')
  stepper: MatStepper;
 
  
  constructor(private _formBuilder: FormBuilder, private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) data: { myObjectHolder: any },
    private _service: SearchServiceService) { 
    this.filteredpositivekeywordss = this.positivekeywordsCtrl.valueChanges.pipe(
      startWith(null),
      map((positivekeywords: string | null) => (positivekeywords ? this._filter(positivekeywords) : this.allpositivekeywordss.slice())),
    );
    // passed from user profile to be pushed with service object
    this.id = data.myObjectHolder;
   

  }


  ngOnInit(): void {
  

  }
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

  onCancel(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = false; 
    dialogConfig.width = "40%";
    dialogConfig.height = "31%";
    this.dialog.open(MessageAlertComponent, dialogConfig)
    console.log(this.stepper.selectedIndex); 

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

  AddService(key1: string, key2: string, des: string )
  {
    this._service.AddService(this.id, key1, key2, des).subscribe({
      next: ser => {
        console.log(JSON.stringify(ser) + 'service added');
        this.message = "service added";
          
         },
      error: (err) => this.message = err
    });

  }
  
}