import { Component, ElementRef, Inject, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageAlertComponent } from '../../shared-components/message-alert/message-alert.component';
import { MatStepper } from '@angular/material/stepper';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { OrderService } from '../../service/order.service';
import { UserService } from '../../service/user.service';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { IPetCategory, EOrderStatus, EPaymentStatus } from '../../interfaces/order';
import { Router } from '@angular/router';
import { eUserGroup, IPetSitter } from '../../interfaces/users';
import { IPet } from '../../interfaces/form';
import { PetService } from '../../service/pet.service';
import { EmailService } from '../../service/email.service';

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
      OrderDescription: new FormControl(''),
      Status: new FormControl(''),
      ServiceID: new FormControl(''), 
      Price: new FormControl(''),
      PaymentStatus: new FormControl(''),
      PetSelected: new FormControl(''),
      CreatedBy: new FormControl(''),
      // service: new FormControl(''),
      OrderStartDate: new FormControl(''),
      OrderEndDate: new FormControl(''),
      StartTime: new FormControl(''),
      EndTime: new FormControl(''),

    });

selectedPet = '';
selectedCategories: any;
  isOptional = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  positivekeywordsCtrl = new FormControl('');
  filteredpositivekeywordss: Observable<string[]>;
  positivekeywordss: string[] = ['morning walk'];
  allpositivekeywordss: string[] = ['Take care', 'Minder', 'Overnight', 'Feed'];
  userGroup: string = localStorage.getItem('userGroup'); 

  @ViewChild('positivekeywordsInput') positivekeywordsInput: ElementRef<HTMLInputElement>;
  @ViewChild('OrderDescription') OrderDescription: ElementRef<HTMLInputElement>;
  @ViewChild('stepper')

  stepper: MatStepper;
  
  orderForm: FormGroup = new FormGroup({});
  message: string;
  petSitter: IPetSitter;
  picker2:any;
  picker: any
  serviceCategory: any[];
  petCategory = JSON.parse(localStorage.getItem('petDetails'));
  serviceSelected: any;
  petSelected: any;
  petDetails: any;
  DisplayMessage: boolean=false;
  
  constructor(private _petService:PetService, public emailService: EmailService, private _formBuilder: FormBuilder,private _httpUser:UserService ,private dialog:MatDialog, private db: OrderService,private _router: Router,
    public authenticator: AuthenticatorService, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.filteredpositivekeywordss = this.positivekeywordsCtrl.valueChanges.pipe(
      startWith(null),
      map((positivekeywords: string | null) => (positivekeywords ? this._filter(positivekeywords) : this.allpositivekeywordss.slice())),
      
    );
  }
  ngOnInit(): void {
console.log(this.data);

    this.serviceCategory= this.data?.serviceList;
    console.log(this.serviceCategory, 'service')
    if(!this.petCategory){
      console.log('TO DO: GET PETS BY PET OWNER WHEN THE LOCAL STORAGE IS EMPTY')
    }
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

  // category= new FormControl('');
  // service=new FormControl(''); 

  onCancel(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = false; 
    dialogConfig.width = "40%";
    dialogConfig.height = "31%";
    this.dialog.open(MessageAlertComponent, dialogConfig)
  }

  changeService(value)
  {
    let obj = JSON.parse(JSON.stringify(value));
    this.selectedCategories = obj[0]?.ServiceTitle;
    this.serviceSelected = value; 

  }
  changePet(value)
  {
    let obj = JSON.parse(JSON.stringify(value));
    this.selectedPet = obj[0]?.name;
    this.petSelected = value; 

  }
  seeform(){
    console.log('check test',this.AddOrder?.value); 
  }

  onSubmit(){

  this.AddOrder.controls['ServiceID'].setValue(this.serviceSelected[0]?.ServiceID);
  this.AddOrder.controls['PetSitterID'].setValue(this.serviceSelected[0]?.PetSitterID);
  this.AddOrder.controls['PetOwnerID'].setValue(3);
  this.AddOrder.controls['Status'].setValue(EOrderStatus.Pending); 
  this.AddOrder.controls['PaymentStatus'].setValue(EPaymentStatus.Pending); 
  this.AddOrder.controls['PetSelected'].setValue(this.petSelected[0]?.petId);
  if(this.userGroup== eUserGroup.PetOwner){
    console.log('it is a pet owner'); 
   this.AddOrder.controls['CreatedBy'].setValue(eUserGroup.PetOwner);
  }
  else if(this.userGroup== eUserGroup.PetSitter){
    this.AddOrder.controls['CreatedBy'].setValue(eUserGroup.PetSitter);
  }

  let startDate = new Date(this.AddOrder.controls['OrderStartDate'].value)
  let endDate = new Date(this.AddOrder.controls['OrderEndDate'].value)
  let startTime = this.AddOrder.controls['StartTime'].value
  let endTime = this.AddOrder.controls['EndTime'].value
 // alert(startDate);
 
  const [hours, minutes] = startTime.split(':');
  const [hours2, minutes2] = endTime.split(':');

  startDate.setHours(parseInt(hours), parseInt(minutes));
  endDate.setHours(parseInt(hours2), parseInt(minutes2));
      //send email when order is placed
      this.emailService.sendOrderPlacedEmail().subscribe(
        data => console.log('Email Sent!', data),
        error => console.log('Error Sending Email!', error)
      );

// const startDateStr = startDate.toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
  const startDateStr = startDate.toUTCString();
  const endDateStr = endDate.toUTCString();

 
//sets the new timestamps as form values
  this.AddOrder.controls['OrderStartDate'].setValue(startDateStr);
  this.AddOrder.controls['OrderEndDate'].setValue(endDateStr);


  console.log(this.AddOrder.value);

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
   this.DisplayMessage = true; 
  //  this.dialog.closeAll();
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


