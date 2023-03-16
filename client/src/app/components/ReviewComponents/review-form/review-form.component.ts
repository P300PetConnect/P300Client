import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestScheduler } from 'rxjs/testing';
import { ReviewService } from 'src/app/components/Review-services/review.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  @Output() closeForm = new EventEmitter<Boolean>();
  stars: number[] = [1,2,3,4,5];
  message: any;
  selected = 1;

   // add order number when integrated
   addReview : FormGroup = new FormGroup({
    subID: new FormControl('', [Validators.required]),
    creatorID: new FormControl('', [Validators.required]),
    rating: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  
  });

      
  constructor(private db: ReviewService, @Inject(MAT_DIALOG_DATA) public data: any) { }



  ngOnInit(): void {
 

 console.log(this.data); 
  }

  onSubmit()
{
      //submits review to be added to DB
    //will get subject and creator ID's when integrated

  this.addReview.controls['subID'].setValue(43);
  this.addReview.controls['creatorID'].setValue(70);
  this.addReview.controls['rating'].setValue(this.selected);
 
  this.db.addReview(this.addReview).subscribe({
    next: review => {
      console.log(JSON.stringify(review) + 'review added');
      this.message = "list added";
      this.close();
     
       },
    error: (err) => this.message = err
  });

this.UpdateReview();
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





}
