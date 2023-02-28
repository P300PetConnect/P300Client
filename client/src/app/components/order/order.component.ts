import { Component, ElementRef, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageAlertComponent } from '../message-alert/message-alert.component';
import { MatStepper } from '@angular/material/stepper';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { OrderService } from '../service/order.service';
import { UserService } from '../service/user.service';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { IPetCategory, IServiceCategory, EOrderStatus, EPaymentStatus } from '../interfaces/order';
import { Router } from '@angular/router';
import { IPetSitter } from '../interfaces/users';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  //Order Form 
      AddOrder : FormGroup = new FormGroup({
      PetSitterID: new FormControl(''),
      PetOwnerID: new FormControl(''),
      OrderDate: new FormControl(''),
      Description: new FormControl(''),
      Status: new FormControl(''),
      ServiceID: new FormControl(''), //input
      Price: new FormControl(''),
      PaymentStatus: new FormControl(''),
      category: new FormControl(''),
      service: new FormControl('')
      
    });

selectedPet = '';
selectedCategories: any;
//   firstFormGroup = this._formBuilder.group({
//     firstCtrl: ['', Validators.required],
// });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: '',
  // });
  isOptional = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  positivekeywordsCtrl = new FormControl('');
  filteredpositivekeywordss: Observable<string[]>;
  positivekeywordss: string[] = ['morning walk'];
  allpositivekeywordss: string[] = ['Take care', 'Minder', 'Overnight', 'Feed'];

  @ViewChild('positivekeywordsInput') positivekeywordsInput: ElementRef<HTMLInputElement>;
  @ViewChild('Description') Description: ElementRef<HTMLInputElement>;

  @ViewChild('stepper')
  stepper: MatStepper;
  
  //form
  orderForm: FormGroup = new FormGroup({});
  message: string;
  petSitter: IPetSitter;

  constructor(private _formBuilder: FormBuilder,private _httpUser:UserService ,private dialog:MatDialog, private db: OrderService,private _router: Router,
    public authenticator: AuthenticatorService) { 
    this.filteredpositivekeywordss = this.positivekeywordsCtrl.valueChanges.pipe(
      startWith(null),
      map((positivekeywords: string | null) => (positivekeywords ? this._filter(positivekeywords) : this.allpositivekeywordss.slice())),
    );

  }
  ngOnInit(): void {

this.getPetSitter(); 
  
}
getPetSitter(){
  this._httpUser.get_petsitter(this.authenticator?.user?.attributes?.email).subscribe(
    async petSitter=>{
      this.petSitter = petSitter;
    }); 
    return false; 
  }


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();
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

petCategory: IPetCategory[] = [
  {value: '../../../assets/images/home/boarding-selected.svg', viewValue:'Bob'},
  {value: '../../../assets/images/home/walk-selected.svg', viewValue: 'Cat'},
  {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Bird'},
  {value: '../../../assets/images/home/daycare-selected.svg', viewValue: 'Fish'},

];
serviceCategory: IServiceCategory[] = [
  {value: '../../../assets/images/home/boarding-selected.svg', viewValue: '1'},
  {value: '../../../assets/images/home/walk-selected.svg', viewValue: '2'},
  {value: '../../../assets/images/home/daycare-selected.svg', viewValue: '3'},
  {value: '../../../assets/images/home/daycare-selected.svg', viewValue: '4'},

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

  onSubmit(){
  console.log('check test',this.AddOrder?.value); 
  this.AddOrder.controls['ServiceID'].setValue(4);
  this.AddOrder.controls['PetSitterID'].setValue(this?.petSitter?.petSitterId);
  this.AddOrder.controls['PetOwnerID'].setValue(3);
  this.AddOrder.controls['Status'].setValue(EOrderStatus.Pendent); 
  this.AddOrder.controls['PaymentStatus'].setValue(EPaymentStatus.Pendent); 

  this.db.addOrder(this.AddOrder).subscribe({
    next: order => {
      console.log(JSON.stringify(order) + 'order added');
      this.message = "list added";
       },
    error: (err) => this.message = err
  });
  console.log('myfomr', this.AddOrder); 


  this._router.routeReuseStrategy. shouldReuseRoute = () => false;
  this._router.onSameUrlNavigation = 'reload';

    this._router.navigate(['/orders']);
   //reload screen 
   this.dialog.closeAll();

}

onClose(){
    this.dialog.closeAll(); 
  }
	url: any; 
	msg = "";
  icon = ""
  isShow:boolean = true; 
	
	selectFile(event: any) { 
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


