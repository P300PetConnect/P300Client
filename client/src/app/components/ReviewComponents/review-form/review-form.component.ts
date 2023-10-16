import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestScheduler } from 'rxjs/testing';
import { ReviewService } from 'src/app/components/Review-services/review.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  @Output() closeForm = new EventEmitter<Boolean>();
  @Output() reviewShow = new EventEmitter<Boolean>();
  @Output() reviewData = new EventEmitter<any>();

  stars: number[] = [1,2,3,4,5];
  message: any;
  selected = 1;
  starRating = 0;

    value: number | null = 2;

    currentRate = 3.14;

   // add order number when integrated
   addReview : FormGroup = new FormGroup({
    subID: new FormControl('', [Validators.required]),
    creatorID: new FormControl('', [Validators.required]),
    rating: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  
  });
  order: any;
  DisplayMessage: boolean = false;

      
  constructor(private db: ReviewService,  @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef:MatDialogRef<ReviewFormComponent>) { }

  ngOnInit(): void {
   this.order = this.data?.order; 
   console.log(this.order); 
  }

  onRateChange(rate: number) {
    this.starRating = rate;
  }

  onSubmit()
{
  this.addReview.controls['subID'].setValue(this.order?.UserID);
  this.addReview.controls['creatorID'].setValue(9);
  this.addReview.controls['rating'].setValue(this.starRating);
  // this.addReview.controls['orderID'].setValue(this.order?.OrderID); 
 
  this.db.addReview(this.addReview).subscribe({
    next: review => {
      console.log(JSON.stringify(review) + 'review added');
      this.message = "list added";
      this.close();
     
       },
    error: (err) => this.message = err
  });

this.UpdateReview();
this.DisplayMessage = true; 
this.reviewData.emit(true);


}

UpdateReview()
{
  let subID = Number(this.addReview.controls['subID'].value);
  let reviewAmount = Number(this.addReview.controls['rating'].value);

  this.db.updateReview(subID,reviewAmount).subscribe({
    next: review => {
      console.log(JSON.stringify(review) + 'review updated');
      this.message = "review Updated";
  
     
       },
    error: (err) => this.message = err
  });

}

close() 
{
  this.closeForm.emit();
}

onClose(){
  this.dialogRef.close(); 
}

}
