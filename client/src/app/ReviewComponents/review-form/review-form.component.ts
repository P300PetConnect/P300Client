import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/Review-services/review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  @Output() closeForm = new EventEmitter<Boolean>();
  stars: number[] = [1,2,3,4,5];
  message: any;

   // add order number when integrated
   addReview : FormGroup = new FormGroup({
    UserIDSubject: new FormControl('', [Validators.required]),
    UserIDCreator: new FormControl('', [Validators.required]),
    ReviewRating: new FormControl('', [Validators.required]),
    ReviewContent: new FormControl('', [Validators.required]),
  
  });

  close() 
  {
    this.closeForm.emit();
  }
  constructor(private db: ReviewService) { }



  ngOnInit(): void {
  }

  onSubmit()
{
 //submits review to be added to DB
 //will get subject and creator ID's when integrated
  this.addReview.controls['UserIDSubject'].setValue(43);
  this.addReview.controls['UserIDCreator'].setValue(6);

  this.db.addReview(this.addReview).subscribe({
    next: review => {
      console.log(JSON.stringify(review) + 'review added');
      this.message = "list added";
      this.close();
     
       },
    error: (err) => this.message = err
  });

  let reviewAmount = this.addReview.controls['UserIDSubject'];

  // this.db.updateReview(reviewAmount).subscribe({
  //   next: review => {
  //     console.log(JSON.stringify(review) + 'review added');
  //     this.message = "list added";
  //     this.close();
     
  //      },
  //   error: (err) => this.message = err
  // });



}



}
